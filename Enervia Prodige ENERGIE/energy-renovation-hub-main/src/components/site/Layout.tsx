import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { propertyRenovationLinks } from "@/lib/property-renovation";
import { siteIdentity, publicationLabel } from "@/lib/site-identity";

const chauffageLinks = [
  { to: "/pompe-a-chaleur", label: "Vue d'ensemble", description: "Toutes les technologies PAC comparées" },
  { to: "/pac-air-eau", label: "PAC air/eau", description: "Remplacement chaudière, réseau hydraulique" },
  { to: "/pac-air-air", label: "PAC air/air", description: "Réversible, confort pièce par pièce" },
  { to: "/pac-geothermie", label: "Géothermie", description: "COP 4–6, performances stables toute l'année" },
  { to: "/reequilibrage-chauffage", label: "Rééquilibrage hydraulique", description: "Réglage des débits, optimisation, confort" },
] as const;

const isolationLinks = [
  { to: "/isolation-thermique", label: "Vue d'ensemble", description: "Hiérarchiser les gestes d'isolation" },
  { to: "/isolation-combles", label: "Combles et toiture", description: "Priorité n°1 · R ≥ 7 m².K/W" },
  { to: "/isolation-murs", label: "Murs (ITE / ITI)", description: "Extérieur ou intérieur, ponts thermiques" },
  { to: "/isolation-planchers", label: "Planchers bas", description: "Vide sanitaire, sous-sol · R ≥ 3" },
  { to: "/menuiseries-fenetres", label: "Fenêtres", description: "Double et triple vitrage · Uw ≤ 1,3" },
  { to: "/vmc-ventilation", label: "VMC / Ventilation", description: "Simple flux, double flux 90 %" },
] as const;

type OpenMenu = "chauffage" | "isolation" | "renover" | null;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);

  const closeMenus = () => {
    setMenuOpen(false);
    setOpenMenu(null);
  };

  const toggle = (menu: OpenMenu) =>
    setOpenMenu((prev) => (prev === menu ? null : menu));

  const dropdownClass =
    "absolute top-full left-1/2 -translate-x-1/2 mt-5 border-t-2 border-[#b9783e] bg-[#f2efe7] p-2 text-[#17221c] shadow-[0_24px_60px_rgba(0,0,0,.3)] w-[280px]";

  const dropdownLink =
    "group flex items-start justify-between gap-4 border-b border-[#d7d1c5] px-4 py-4 last:border-b-0 hover:bg-white transition-colors";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111814]/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-[90px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">
        <Link to="/" className="group flex items-center" onClick={closeMenus}>
          <img src="/logo.png" alt="Enervia Logo" className="h-[80px] w-auto object-contain transition-transform duration-300 hover:scale-105" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">

          {/* Chauffage */}
          <div className="relative">
            <button
              type="button"
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-white ${openMenu === "chauffage" ? "text-[#e2b47d]" : "text-white/65"}`}
              aria-expanded={openMenu === "chauffage"}
              onClick={() => toggle("chauffage")}
            >
              Chauffage
              <ChevronDown className={`size-4 transition-transform ${openMenu === "chauffage" ? "rotate-180" : ""}`} aria-hidden />
            </button>
            {openMenu === "chauffage" && (
              <div className={dropdownClass}>
                {chauffageLinks.map((item) => (
                  <Link key={item.to} to={item.to} className={dropdownLink} onClick={closeMenus}>
                    <div>
                      <p className="text-sm font-bold text-[#111814] group-hover:text-[#b9783e]">{item.label}</p>
                      <p className="mt-0.5 text-xs text-[#667169] leading-snug">{item.description}</p>
                    </div>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-[#9a6034] transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Isolation */}
          <div className="relative">
            <button
              type="button"
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-white ${openMenu === "isolation" ? "text-[#e2b47d]" : "text-white/65"}`}
              aria-expanded={openMenu === "isolation"}
              onClick={() => toggle("isolation")}
            >
              Isolation
              <ChevronDown className={`size-4 transition-transform ${openMenu === "isolation" ? "rotate-180" : ""}`} aria-hidden />
            </button>
            {openMenu === "isolation" && (
              <div className={dropdownClass}>
                {isolationLinks.map((item) => (
                  <Link key={item.to} to={item.to} className={dropdownLink} onClick={closeMenus}>
                    <div>
                      <p className="text-sm font-bold text-[#111814] group-hover:text-[#b9783e]">{item.label}</p>
                      <p className="mt-0.5 text-xs text-[#667169] leading-snug">{item.description}</p>
                    </div>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-[#9a6034] transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Aides */}
          <Link
            to="/aides-financieres-2026"
            className="text-sm font-semibold text-white/65 transition-colors hover:text-white"
            activeProps={{ className: "text-[#e2b47d]" }}
            onClick={closeMenus}
          >
            Aides 2026
          </Link>

          {/* Rénover mon bien */}
          <div className="relative">
            <button
              type="button"
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-white ${openMenu === "renover" ? "text-[#e2b47d]" : "text-white/65"}`}
              aria-expanded={openMenu === "renover"}
              onClick={() => toggle("renover")}
            >
              Rénover mon bien
              <ChevronDown className={`size-4 transition-transform ${openMenu === "renover" ? "rotate-180" : ""}`} aria-hidden />
            </button>
            {openMenu === "renover" && (
              <div className={dropdownClass}>
                {propertyRenovationLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group flex items-center justify-between gap-3 border-b border-[#d7d1c5] px-4 py-3 text-sm font-bold text-[#111814] transition-colors last:border-b-0 hover:bg-white hover:text-[#b9783e]"
                    onClick={closeMenus}
                  >
                    {item.title}
                    <ArrowRight className="size-4 shrink-0 text-[#9a6034] transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/notre-methode" className="text-sm font-semibold text-white/65 transition-colors hover:text-white" activeProps={{ className: "text-[#e2b47d]" }} onClick={closeMenus}>
            Notre méthode
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/simulation"
            hash="simulateur"
            className="hidden min-h-11 items-center gap-2 rounded-lg bg-[#b9783e] px-5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-[#c9894e] hover:shadow-[0_0_20px_rgba(185,120,62,0.4)] sm:inline-flex"
          >
            Estimer mon projet
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg border border-white/20 text-white lg:hidden"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMenuOpen((open) => !open);
              setOpenMenu(null);
            }}
          >
            {menuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-white/10 bg-[#111814] px-5 py-5 lg:hidden"
          aria-label="Navigation mobile"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col">

            {/* Chauffage mobile */}
            <div className="border-b border-white/10">
              <button
                type="button"
                className="flex w-full items-center justify-between py-4 text-base text-white/80"
                onClick={() => toggle("chauffage")}
              >
                Chauffage
                <ChevronDown className={`size-4 transition-transform ${openMenu === "chauffage" ? "rotate-180" : ""}`} aria-hidden />
              </button>
              {openMenu === "chauffage" && (
                <div className="mb-3 space-y-0.5 pl-2">
                  {chauffageLinks.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex min-h-11 items-center gap-2 py-2 text-sm font-semibold text-white/70 hover:text-[#d9a66e]"
                      onClick={closeMenus}
                    >
                      <ArrowRight className="size-3.5 shrink-0 text-[#d9a66e]" aria-hidden />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Isolation mobile */}
            <div className="border-b border-white/10">
              <button
                type="button"
                className="flex w-full items-center justify-between py-4 text-base text-white/80"
                onClick={() => toggle("isolation")}
              >
                Isolation
                <ChevronDown className={`size-4 transition-transform ${openMenu === "isolation" ? "rotate-180" : ""}`} aria-hidden />
              </button>
              {openMenu === "isolation" && (
                <div className="mb-3 space-y-0.5 pl-2">
                  {isolationLinks.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex min-h-11 items-center gap-2 py-2 text-sm font-semibold text-white/70 hover:text-[#d9a66e]"
                      onClick={closeMenus}
                    >
                      <ArrowRight className="size-3.5 shrink-0 text-[#d9a66e]" aria-hidden />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Aides */}
            <Link
              to="/aides-financieres-2026"
              className="border-b border-white/10 py-4 text-base text-white/80"
              onClick={closeMenus}
            >
              Aides 2026
            </Link>

            {/* Rénover mon bien mobile */}
            <div className="border-b border-white/10 py-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d9a66e]">
                Rénover mon bien
              </p>
              <div className="mt-3 space-y-1">
                {propertyRenovationLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex min-h-12 items-center justify-between gap-3 py-3 text-base font-bold text-white transition-colors hover:text-[#d9a66e]"
                    onClick={closeMenus}
                  >
                    {item.title}
                    <ArrowRight className="size-4 shrink-0 text-[#d9a66e]" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/notre-methode"
              className="border-b border-white/10 py-4 text-base text-white/80 transition-colors hover:text-[#d9a66e]"
              onClick={closeMenus}
            >
              Notre méthode
            </Link>
            <Link
              to="/simulation"
              hash="simulateur"
              className="mt-5 inline-flex min-h-12 items-center justify-center bg-[#b9783e] px-5 text-sm font-semibold"
              onClick={closeMenus}
            >
              Estimer mon projet
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#101713] text-white">
      <div className="mx-auto max-w-7xl px-5 py-6 md:py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-6 md:gap-8 border-b border-white/10 pb-6 md:pb-14">
          <div className="col-span-2 max-w-md md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Enervia Logo" className="h-12 md:h-20 w-auto object-contain" />
            </div>
            <p className="mt-4 md:mt-5 hidden md:block text-sm leading-7 text-white/55">
              Expert de la <strong>rénovation énergétique globale</strong>, nous vous accompagnons
              dans votre transition écologique. Optimisez votre <strong>DPE</strong> (Diagnostic de Performance
              Énergétique), réduisez vos factures de chauffage et bénéficiez des subventions de l'État
              comme <strong>MaPrimeRénov'</strong> et les primes CEE.
            </p>
          </div>

          <div className="col-span-1">
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-[#d9a66e]">
              Nos solutions
            </p>
            <ul className="mt-2 md:mt-5 space-y-1 md:space-y-3 text-[12px] md:text-sm text-white/60">
              <li><Link to="/pompe-a-chaleur" className="transition-colors hover:text-white">Chauffage PAC</Link></li>
              <li><Link to="/isolation-thermique" className="transition-colors hover:text-white">Isolation thermique</Link></li>
              <li><Link to="/aides-financieres-2026" className="transition-colors hover:text-white">Aides 2026</Link></li>
              <li><Link to="/simulation" hash="simulateur" className="transition-colors hover:text-white">Simulation en ligne</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-[#d9a66e]">
              Travaux populaires
            </p>
            <ul className="mt-2 md:mt-5 space-y-1 md:space-y-3 text-[12px] md:text-sm text-white/55">
              <li><Link to="/pac-air-eau" className="hover:text-white transition-colors">PAC air/eau</Link></li>
              <li><Link to="/pac-air-air" className="hover:text-white transition-colors">PAC air/air réversible</Link></li>
              <li><Link to="/isolation-combles" className="hover:text-white transition-colors">Isolation des combles</Link></li>
              <li><Link to="/isolation-murs" className="hover:text-white transition-colors">Isolation des murs (ITE/ITI)</Link></li>
              <li><Link to="/vmc-ventilation" className="hover:text-white transition-colors">VMC double flux</Link></li>
              <li><Link to="/menuiseries-fenetres" className="hover:text-white transition-colors">Fenêtres et menuiseries</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
             <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-[#d9a66e]">
              Subventions
            </p>
            <ul className="mt-2 md:mt-5 space-y-1 md:space-y-3 text-[12px] md:text-sm text-white/55">
              <li><Link to="/maprimerenov" className="hover:text-white transition-colors">MaPrimeRénov' 2026</Link></li>
              <li><Link to="/prime-cee" className="hover:text-white transition-colors">Prime CEE (Coup de pouce)</Link></li>
              <li><Link to="/eco-ptz" className="hover:text-white transition-colors">Éco-prêt à taux zéro</Link></li>
              <li><Link to="/renovation-ampleur" className="hover:text-white transition-colors">Rénovation d'ampleur</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-[#d9a66e]">
              Contact
            </p>
            <ul className="mt-2 md:mt-5 space-y-1 md:space-y-3 text-[12px] md:text-sm text-white/55">
              <li className="flex flex-col">
                <span className="text-white/40 text-[9px] uppercase mb-0.5">Qualité</span>
                <span className="font-semibold text-white/80">Artisans certifiés RGE</span>
              </li>
              <li className="flex flex-col pt-1 md:pt-2">
                <span className="text-white/40 text-[9px] uppercase mb-0.5">Horaires</span>
                <span>Lun - Ven : 9h00 - 18h00</span>
              </li>
              <li className="flex flex-col pt-1 md:pt-2">
                <span className="text-white/40 text-[9px] uppercase mb-0.5">Support</span>
                <a href={`mailto:${publicationLabel(siteIdentity.contactEmail)}`} className="hover:text-white transition-colors">{publicationLabel(siteIdentity.contactEmail)}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 md:pt-6 mt-6 md:mt-10 text-center">
          <p className="text-[11px] md:text-xs text-white/55">
            Les informations présentées sur cette page sont issues de sources officielles.
          </p>
        </div>
        <div className="flex flex-col gap-2 pt-4 md:pt-6 text-[11px] md:text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteIdentity.commercialName}
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Informations du site">
            <Link to="/contact" className="transition-colors hover:text-white">
              Contact
            </Link>
            <Link to="/nos-zones-d-intervention" className="transition-colors hover:text-white">
              Zones d'intervention
            </Link>
            <Link to="/mentions-legales" className="transition-colors hover:text-white">
              Mentions légales
            </Link>
            <Link to="/politique-de-confidentialite" className="transition-colors hover:text-white">
              Confidentialité
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
