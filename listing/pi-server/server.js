// Petit serveur de sauvegarde pour l'appli "listing".
// Reçoit une copie complète des données de l'appli à chaque synchro et la
// garde dans des fichiers JSON locaux, pour ne jamais rien perdre même si
// le téléphone est perdu, cassé ou remis à zéro.
//
// Voir README.md pour l'installation sur le Raspberry Pi.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4000;
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error('ERREUR: API_KEY manquante. Crée un fichier .env (voir .env.example) avant de démarrer le serveur.');
  process.exit(1);
}

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const COLLECTION_TO_FILE = {
  courses: 'courses.json',
  referenceCourses: 'reference-courses.json',
  fuelExpenses: 'fuel-expenses.json',
  motoExpenses: 'moto-expenses.json',
  closures: 'month-closures.json',
};

function filePath(name) {
  return path.join(DATA_DIR, name);
}

function readCollection(file) {
  try {
    const raw = fs.readFileSync(filePath(file), 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Écriture atomique (fichier temporaire puis renommage) pour ne jamais
// corrompre les données si le Pi perd le courant en pleine écriture.
function writeCollection(file, rows) {
  const target = filePath(file);
  const tmp = target + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(rows, null, 2), 'utf8');
  fs.renameSync(tmp, target);
}

function readMeta() {
  try {
    return JSON.parse(fs.readFileSync(filePath('meta.json'), 'utf8'));
  } catch {
    return {};
  }
}

function writeMeta(meta) {
  writeCollection('meta.json', meta);
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '25mb' }));

// --- Authentification simple par clé API (à mettre aussi dans l'appli) ---
app.use((req, res, next) => {
  if (req.path === '/api/health') return next();
  const key = req.header('x-api-key');
  if (key !== API_KEY) {
    return res.status(401).json({ error: 'Clé API invalide.' });
  }
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Reçoit une photo complète des données de l'appli et remplace le contenu
// de chaque fichier par ce qui est envoyé (miroir fidèle, pas de fusion).
app.post('/api/backup', (req, res) => {
  const body = req.body || {};
  const summary = {};

  for (const [key, file] of Object.entries(COLLECTION_TO_FILE)) {
    const rows = Array.isArray(body[key]) ? body[key] : [];
    writeCollection(file, rows);
    summary[key] = rows.length;
  }

  const now = new Date().toISOString();
  writeMeta({ lastBackupAt: now });

  res.json({ ok: true, savedAt: now, summary });
});

// Renvoie la dernière sauvegarde complète (pour restaurer sur un nouveau téléphone).
app.get('/api/backup', (req, res) => {
  const result = {};
  for (const [key, file] of Object.entries(COLLECTION_TO_FILE)) {
    result[key] = readCollection(file);
  }
  const meta = readMeta();
  res.json({ ...result, lastBackupAt: meta.lastBackupAt || null });
});

app.listen(PORT, () => {
  console.log(`Serveur de sauvegarde listing démarré sur le port ${PORT}`);
});
