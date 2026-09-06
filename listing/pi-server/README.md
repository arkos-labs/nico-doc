# Serveur de sauvegarde — Raspberry Pi

Ce petit serveur reçoit une copie de toutes les données de l'appli (courses,
base de référence, essence, moto, mois clôturés) à chaque synchro et les
garde dans des fichiers sur ton Raspberry Pi (dossier `data/`). Même si le
téléphone est perdu, cassé ou remis à zéro, tout reste ici.

Il faut faire ces étapes **une seule fois**, directement sur le Raspberry Pi
(écran + clavier branchés, ou en te connectant dessus en SSH si tu sais déjà
faire).

## 1. Installer Node.js sur le Pi

Ouvre un terminal sur le Raspberry Pi et tape :

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
```

La dernière commande doit afficher quelque chose comme `v20.x.x`.

## 2. Copier ce dossier sur le Pi

Copie tout le dossier `pi-server` (celui qui contient ce fichier) sur le
Raspberry Pi, par exemple avec une clé USB, ou avec `scp` si tu es à l'aise
avec ça. Place-le par exemple dans `/home/pi/listing-backup/`.

## 3. Installer les dépendances

Dans le terminal, sur le Pi :

```bash
cd /home/pi/listing-backup
npm install
```

## 4. Configurer la clé secrète

```bash
cp .env.example .env
nano .env
```

Remplace `change-moi` par une clé secrète bien longue (par exemple, génère-en
une avec `openssl rand -hex 32` et colle le résultat). Cette clé est ce qui
empêche n'importe qui d'écrire dans ta sauvegarde — garde-la uniquement dans
ce fichier et dans l'appli, ne la partage à personne.

Sauvegarde avec `Ctrl+O`, `Entrée`, puis quitte avec `Ctrl+X`.

## 5. Tester

```bash
npm start
```

Tu dois voir : `Serveur de sauvegarde listing démarré sur le port 4000`.
Laisse-le tourner, et passe à l'étape suivante dans un **autre** terminal
(ou continue après avoir installé Tailscale — voir plus bas).

Pour arrêter le test : `Ctrl+C`.

## 6. Faire démarrer le serveur automatiquement (survit aux coupures de courant / redémarrages)

Crée un service système pour que le serveur redémarre tout seul, même après
une coupure de courant ou un redémarrage du Pi :

```bash
sudo nano /etc/systemd/system/listing-backup.service
```

Colle ce contenu (adapte le chemin si tu as copié le dossier ailleurs) :

```ini
[Unit]
Description=Serveur de sauvegarde listing
After=network.target

[Service]
WorkingDirectory=/home/pi/listing-backup
ExecStart=/usr/bin/node server.js
Restart=always
User=pi

[Install]
WantedBy=multi-user.target
```

Puis active-le :

```bash
sudo systemctl enable listing-backup
sudo systemctl start listing-backup
sudo systemctl status listing-backup
```

Le statut doit afficher "active (running)" en vert.

## 7. Installer Tailscale (pour que le téléphone atteigne le Pi de partout)

Sur le Raspberry Pi :

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

Une adresse web s'affiche : ouvre-la depuis n'importe quel navigateur pour te
connecter (ou créer) un compte Tailscale, et autorise le Pi.

Sur ton **téléphone** : installe l'appli "Tailscale" (App Store / Google
Play), connecte-toi avec le **même compte**.

## 8. Trouver l'adresse du Pi

Sur le Raspberry Pi :

```bash
tailscale ip -4
```

Ça affiche une adresse du genre `100.x.x.x`. C'est celle-là qu'il faudra
rentrer dans l'appli (onglet "Réglages"), avec le port `4000` et la clé
secrète mise dans `.env` à l'étape 4.

## Vérifier que ça marche

Depuis ton téléphone, avec Tailscale connecté, ouvre dans un navigateur :

```
http://100.x.x.x:4000/api/health
```

(en remplaçant par ta vraie adresse). Tu dois voir `{"ok":true,...}`.

Si ça marche, configure l'onglet "Réglages" de l'appli avec cette adresse,
le port `4000` et ta clé secrète — la sauvegarde se fera automatiquement à
partir de là, où que tu sois.
