"""
import_to_supabase.py
====================
Script one-shot : lit tous les fichiers .xls du dossier "listing test"
et insère les courses dans Supabase (sans doublons).

Usage :
    pip install xlrd requests
    python import_to_supabase.py
"""

import os
import re
import hashlib
import json
import urllib.request
import urllib.error

# ---------------------------------------------------------------------------
# Config Supabase
# ---------------------------------------------------------------------------

SUPABASE_URL = "https://wtrlmjyzklxljiulbzca.supabase.co"

# Clé service_role — bypasse les RLS, ne jamais committer dans git
# Récupérable dans : Supabase Dashboard → Settings → API → service_role
SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
if not SERVICE_ROLE_KEY:
    raise SystemExit(
        "❌ Variable SUPABASE_SERVICE_ROLE_KEY manquante.\n"
        "   Récupère la clé dans Supabase Dashboard → Settings → API → service_role\n"
        "   Puis lance : set SUPABASE_SERVICE_ROLE_KEY=ta_clé  (Windows)\n"
        "             ou export SUPABASE_SERVICE_ROLE_KEY=ta_clé  (Mac/Linux)"
    )

HEADERS = {
    "apikey": SERVICE_ROLE_KEY,
    "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "resolution=ignore-duplicates,return=representation",
}

# Dossier contenant les .xls
LISTING_DIR = os.path.join(os.path.dirname(__file__), "listing test")

# ---------------------------------------------------------------------------
# Parsing XLS
# ---------------------------------------------------------------------------

LOC_LINE_RE = re.compile(r"^(\d{2}/\d{2}\s+\d{2}:\d{2})\s*;\s*(.*)$")


def normalize(s: str) -> str:
    import unicodedata
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return s.lower().strip()


def clean_lieu(s: str) -> str:
    s = re.sub(r"\s*-\s*-\s*", " - ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def parse_loc_line(line: str):
    m = LOC_LINE_RE.match(line.strip())
    if m:
        return m.group(1), clean_lieu(m.group(2))
    return "", clean_lieu(line)


def make_hash(lieu_enl: str, lieu_livr: str, vehicule: str) -> str:
    s = f"{lieu_enl.strip().lower()}|{lieu_livr.strip().lower()}|{vehicule.strip().lower()}"
    return hashlib.md5(s.encode("utf-8")).hexdigest()


def parse_xls(filepath: str) -> list[dict]:
    import xlrd
    results = []

    wb = xlrd.open_workbook(filepath)
    for sheet in wb.sheets():
        grid = []
        for r in range(sheet.nrows):
            grid.append([str(sheet.cell_value(r, c)) for c in range(sheet.ncols)])

        # Trouver la ligne d'en-tête
        header_row = -1
        loc_col = -1
        qte_col = -1
        veh_col = -1

        for r, row in enumerate(grid[:60]):
            for c, cell in enumerate(row):
                n = normalize(cell.replace("\n", " "))
                if "enlevement" in n and "livraison" in n:
                    loc_col = c
                    header_row = r
                if "qte" in n and "achat" in n:
                    qte_col = c

        if header_row == -1 or loc_col == -1:
            continue

        # Résoudre la vraie colonne loc (données réelles)
        for r in range(header_row + 1, min(len(grid), header_row + 150)):
            cell = grid[r][loc_col] if loc_col < len(grid[r]) else ""
            if LOC_LINE_RE.match(cell.strip().split("\n")[0].strip()):
                break
            # chercher dans les voisins
            for d in range(-2, 3):
                c2 = loc_col + d
                if 0 <= c2 < len(grid[r]):
                    if LOC_LINE_RE.match(grid[r][c2].strip().split("\n")[0].strip()):
                        loc_col = c2
                        break

        # Trouver colonne vehicule (texte entre loc_col et qte_col)
        for r in range(header_row + 1, min(len(grid), header_row + 50)):
            row = grid[r]
            if loc_col < len(row) and LOC_LINE_RE.match(row[loc_col].strip().split("\n")[0].strip()):
                end = qte_col if qte_col > loc_col else len(row)
                for c in range(loc_col + 1, end):
                    v = row[c].strip()
                    if v and not v.replace(".", "").replace(",", "").isdigit():
                        veh_col = c
                        break
                break

        # Lire les données
        separateur_trouve = False
        courses_vues = 0
        domaine = "courseCourse"

        for r in range(header_row + 1, len(grid)):
            row = grid[r]
            raw = row[loc_col].strip() if loc_col < len(row) else ""

            if not raw:
                # Vérifier si c'est le sous-total (séparateur entre courseCourse et medical)
                if not separateur_trouve and courses_vues > 0 and qte_col != -1:
                    qte_cell = row[qte_col].strip() if qte_col < len(row) else ""
                    try:
                        val = float(qte_cell.replace(",", "."))
                        if val > 0:
                            separateur_trouve = True
                            domaine = "medical"
                    except ValueError:
                        pass
                continue

            lines = [l.strip() for l in raw.split("\n") if l.strip()]
            if not lines:
                continue

            _, lieu_enl = parse_loc_line(lines[0])
            lieu_livr = ""
            if len(lines) > 1:
                _, lieu_livr = parse_loc_line(lines[1])

            qte = 0.0
            if qte_col != -1 and qte_col < len(row):
                try:
                    qte = float(row[qte_col].strip().replace(",", "."))
                except (ValueError, AttributeError):
                    qte = 0.0

            vehicule = ""
            if veh_col != -1 and veh_col < len(row):
                vehicule = row[veh_col].strip()

            if not lieu_enl and not lieu_livr and qte == 0:
                continue

            if not separateur_trouve:
                courses_vues += 1

            results.append({
                "lieu_enlevement": lieu_enl,
                "lieu_livraison": lieu_livr,
                "qte_bon": qte,
                "vehicule": vehicule or None,
                "domaine": domaine,
                "hash": make_hash(lieu_enl, lieu_livr, vehicule),
            })

    return results


# ---------------------------------------------------------------------------
# Insertion Supabase
# ---------------------------------------------------------------------------

def upsert_batch(rows: list[dict]) -> int:
    url = f"{SUPABASE_URL}/rest/v1/reference_courses"
    body = json.dumps(rows).encode("utf-8")
    req = urllib.request.Request(url, data=body, headers=HEADERS, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read())
            return len(data)
    except urllib.error.HTTPError as e:
        body_err = e.read().decode("utf-8", errors="replace")
        print(f"  ⚠️  Erreur HTTP {e.code}: {body_err[:200]}")
        return 0


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    try:
        import xlrd  # noqa
    except ImportError:
        print("Installation de xlrd...")
        os.system("pip install xlrd --break-system-packages -q")
        import xlrd  # noqa

    if not os.path.isdir(LISTING_DIR):
        print(f"❌ Dossier introuvable : {LISTING_DIR}")
        return

    xls_files = [f for f in os.listdir(LISTING_DIR) if f.lower().endswith(".xls")]
    if not xls_files:
        print("❌ Aucun fichier .xls trouvé dans", LISTING_DIR)
        return

    print(f"📂 {len(xls_files)} fichier(s) trouvé(s)\n")

    all_rows = []
    for fname in sorted(xls_files):
        path = os.path.join(LISTING_DIR, fname)
        print(f"  Lecture : {fname} ...", end=" ")
        try:
            rows = parse_xls(path)
            print(f"{len(rows)} courses")
            all_rows.extend(rows)
        except Exception as e:
            print(f"ERREUR : {e}")

    # ---------------------------------------------------------------------------
    # Dédoublonner : pour chaque (enlèvement, livraison, véhicule),
    # garder uniquement la valeur MAX de qte_bon.
    # Les listings contiennent des prix déjà optimisés — on veut le prix de BASE.
    # ---------------------------------------------------------------------------
    best: dict[str, dict] = {}
    for r in all_rows:
        h = r["hash"]
        if h not in best or r["qte_bon"] > best[h]["qte_bon"]:
            best[h] = r
    unique_rows = list(best.values())
    dupes_local = len(all_rows) - len(unique_rows)

    # ---------------------------------------------------------------------------
    # Appliquer les prix minimum (corriger les prix optimisés résiduels)
    # ---------------------------------------------------------------------------
    def postal2(addr: str) -> str:
        m = re.search(r'\b(\d{5})\b', addr)
        return m.group(1)[:2] if m else ''

    def is_paris(addr: str) -> bool:
        return postal2(addr) == '75'

    def is_banlieue(addr: str) -> bool:
        return postal2(addr) in ('91', '92', '93', '94', '77', '78', '95')

    corriges = 0
    for r in unique_rows:
        enl, liv, veh = r["lieu_enlevement"], r["lieu_livraison"], (r["vehicule"] or "")
        veh_up = veh.upper()
        is_break = "BREAK" in veh_up
        is_vital = "VITAL" in veh_up or "URGENCE" in veh_up
        is_prog  = "PROGRAMME" in veh_up

        if is_prog:
            continue  # navettes : pas de minimum

        if is_paris(enl) and is_paris(liv):
            # Paris → Paris
            if is_break   and r["qte_bon"] < 4.5: r["qte_bon"] = 4.5; corriges += 1
            elif is_vital and r["qte_bon"] < 3.5: r["qte_bon"] = 3.5; corriges += 1
            elif not is_break and not is_vital and r["qte_bon"] < 2.5:
                r["qte_bon"] = 2.5; corriges += 1
        elif is_banlieue(enl) or is_banlieue(liv):
            # Banlieue impliquée : minimum 3 bons
            if r["qte_bon"] < 3.0: r["qte_bon"] = 3.0; corriges += 1

    print(f"\n📊 Total parsé : {len(all_rows)} | Doublons/optimisés retirés : {dupes_local} | Prix corrigés : {corriges} | À insérer : {len(unique_rows)}")

    # Envoyer par batch de 500
    BATCH = 500
    total_inserted = 0
    for i in range(0, len(unique_rows), BATCH):
        batch = unique_rows[i:i + BATCH]
        n = upsert_batch(batch)
        total_inserted += n
        print(f"  Batch {i // BATCH + 1} : {n}/{len(batch)} insérées")

    print(f"\n✅ Import terminé — {total_inserted} nouvelles courses dans Supabase")


if __name__ == "__main__":
    main()
