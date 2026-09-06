/**
 * Admin Base — vue globale de toutes les courses de référence.
 * Permet d'importer de nouveaux listings, de consulter le total,
 * et de corriger manuellement le prix d'une route spécifique.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert, FlatList, KeyboardAvoidingView, Modal, Platform,
  StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Check, Database, Pencil, Search, Trash2, Upload, X } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useReference } from '@/context/ReferenceContext';
import { invalidateCache } from '@/lib/supabaseSync';
import { supabase } from '@/lib/supabase';
import { parseExcelFile } from '@/lib/excelImport';
import { parsePdfFile } from '@/lib/pdfImport';
import { includesNormalized } from '@/lib/text';
import { detectDomaine } from '@/lib/domaine';
import { canonicalizeVehicule, CANONICAL_VEHICULES } from '@/lib/vehicule';
import type { ReferenceCourse } from '@/types/course';
import type { Domaine } from '@/lib/domaine';

function makeHashJS(enl: string, liv: string, veh: string): string {
  const str = [enl.trim().toLowerCase(), liv.trim().toLowerCase(), veh.trim().toLowerCase()].join('|');
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    hash = hash >>> 0;
  }
  return hash.toString(16).padStart(8, '0') + '_' + str.slice(0, 40).replace(/[^a-z0-9]/g, '_');
}

function getEffectiveDomaine(c: ReferenceCourse): Domaine {
  if (c.domaine) return c.domaine;
  return detectDomaine(c.lieuEnlevement ?? '', c.lieuLivraison ?? '');
}

const TYPE_META: Record<string, { label: string; color: string }> = {
  '2 ROUES EXPRESS':        { label: 'EXPRESS',    color: '#d97706' },
  '2 ROUES URGENCE VITALE': { label: 'VITALE ⚡',  color: '#dc2626' },
  '2 ROUES NORMAL':         { label: 'NORMAL',     color: '#2563eb' },
  '2 ROUES PROGRAMME':      { label: 'PROGRAMME',  color: '#134024' },
  '2 ROUES ALLER-RETOUR':   { label: 'A/R',        color: '#7c3aed' },
  'SUIVEUSE':               { label: 'SUIVEUSE',   color: '#0891b2' },
  'NUIT':                   { label: 'NUIT 🌙',    color: '#1e3a5f' },
  'BREAK / 4 ROUES':        { label: 'BREAK',      color: '#6b7280' },
};

function typeLabel(vehicule: string | null | undefined): { label: string; color: string } {
  const canon = canonicalizeVehicule(vehicule);
  return canon ? (TYPE_META[canon] ?? { label: canon, color: '#6b7280' })
               : { label: '—', color: '#9ca3af' };
}

// ---------------------------------------------------------------------------
// Ligne de liste (cliquable pour éditer)
// ---------------------------------------------------------------------------

function CourseRow({
  item, colors, onEdit,
}: {
  item: ReferenceCourse;
  colors: any;
  onEdit: (item: ReferenceCourse) => void;
}) {
  const { label, color } = typeLabel(item.vehicule);

  return (
    <TouchableOpacity
      style={[styles.row, { backgroundColor: colors.card }]}
      onPress={() => onEdit(item)}
      activeOpacity={0.7}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.rowAddr, { color: colors.text }]} numberOfLines={1}>
          {item.lieuEnlevement}
        </Text>
        <Text style={[styles.rowAddr, { color: colors.textMuted }]} numberOfLines={1}>
          → {item.lieuLivraison}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 4 }}>
        <View style={[styles.tag, { backgroundColor: color + '20' }]}>
          <Text style={[styles.tagText, { color }]}>{label}</Text>
        </View>
        <Text style={[styles.qte, { color: colors.textFaint }]}>
          {item.qteBon} bon{item.qteBon > 1 ? 's' : ''}
        </Text>
      </View>
      <Pencil size={14} color={colors.textFaint} style={{ marginLeft: 4 }} />
    </TouchableOpacity>
  );
}

// ---------------------------------------------------------------------------
// Modal d'édition du prix
// ---------------------------------------------------------------------------

function EditPriceModal({
  course, colors, onClose, onSaved,
}: {
  course: ReferenceCourse | null;
  colors: any;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [enlevement, setEnlevement] = useState('');
  const [livraison, setLivraison] = useState('');
  const [value, setValue] = useState('');
  const [vehicule, setVehicule] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (course) {
      setEnlevement(course.lieuEnlevement ?? '');
      setLivraison(course.lieuLivraison ?? '');
      setValue(String(course.qteBon));
      setVehicule(canonicalizeVehicule(course.vehicule) ?? course.vehicule ?? '');
      setError('');
    }
  }, [course]);

  const save = async () => {
    const parsed = parseFloat(value.replace(',', '.'));
    if (isNaN(parsed) || parsed <= 0) { setError('Nombre de bons invalide'); return; }
    if (!enlevement.trim()) { setError('Adresse de départ requise'); return; }
    if (!livraison.trim()) { setError('Adresse de livraison requise'); return; }
    if (!course?.id) return;

    setSaving(true);

    const newHash = makeHashJS(enlevement.trim(), livraison.trim(), vehicule);
    const { error: supaErr } = await supabase
      .from('reference_courses')
      .update({
        lieu_enlevement: enlevement.trim(),
        lieu_livraison: livraison.trim(),
        qte_bon: parsed,
        vehicule: vehicule || null,
        hash: newHash,
      })
      .eq('id', course.id);

    setSaving(false);
    if (supaErr) { setError('Erreur : ' + supaErr.message); return; }

    await invalidateCache();
    onSaved();
    onClose();
  };

  if (!course) return null;

  return (
    <Modal visible={!!course} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} />

        <View style={[styles.modalCard, { backgroundColor: colors.card }]}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Modifier la course</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={20} color={colors.textFaint} />
            </TouchableOpacity>
          </View>

          {/* Adresse départ */}
          <Text style={[styles.inputLabel, { color: colors.textMuted }]}>Adresse de départ</Text>
          <View style={[styles.inputRow, { borderColor: colors.border }]}>
            <TextInput
              style={[styles.addrInput, { color: colors.text }]}
              value={enlevement}
              onChangeText={(t) => { setEnlevement(t); setError(''); }}
              placeholder="Ex. BICHAT - 75018 PARIS"
              placeholderTextColor={colors.textFaint}
              autoCapitalize="characters"
              returnKeyType="next"
            />
          </View>

          {/* Adresse livraison */}
          <Text style={[styles.inputLabel, { color: colors.textMuted }]}>Adresse de livraison</Text>
          <View style={[styles.inputRow, { borderColor: colors.border }]}>
            <TextInput
              style={[styles.addrInput, { color: colors.text }]}
              value={livraison}
              onChangeText={(t) => { setLivraison(t); setError(''); }}
              placeholder="Ex. AVICENNE - 93000 BOBIGNY"
              placeholderTextColor={colors.textFaint}
              autoCapitalize="characters"
              returnKeyType="next"
            />
          </View>

          {/* Type de course */}
          <Text style={[styles.inputLabel, { color: colors.textMuted }]}>Type de course</Text>

          {/* Badge type actuel */}
          {vehicule ? (
            <View style={[styles.currentTypeBadge, { backgroundColor: (TYPE_META[vehicule]?.color ?? '#6b7280') + '20' }]}>
              <Text style={[styles.currentTypeLabel, { color: TYPE_META[vehicule]?.color ?? '#6b7280' }]}>
                ✓ {TYPE_META[vehicule]?.label ?? vehicule}
              </Text>
            </View>
          ) : (
            <View style={[styles.currentTypeBadge, { backgroundColor: '#fef2f2' }]}>
              <Text style={[styles.currentTypeLabel, { color: '#dc2626' }]}>⚠ Aucun type défini — tapez pour choisir</Text>
            </View>
          )}

          <View style={styles.vehGrid}>
            {CANONICAL_VEHICULES.map((v) => {
              const selected = vehicule === v;
              const meta = TYPE_META[v] ?? { label: v, color: '#6b7280' };
              return (
                <TouchableOpacity
                  key={v}
                  style={[
                    styles.vehChip,
                    { borderColor: selected ? meta.color : colors.border },
                    selected && { backgroundColor: meta.color },
                  ]}
                  onPress={() => setVehicule(v)}
                >
                  <Text style={[
                    styles.vehChipText,
                    { color: selected ? '#fff' : colors.textMuted },
                  ]}>
                    {meta.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Bons */}
          <Text style={[styles.inputLabel, { color: colors.textMuted }]}>Nombre de bons</Text>
          <View style={[styles.inputRow, { borderColor: error ? '#dc2626' : colors.border }]}>
            <TextInput
              style={[styles.priceInput, { color: colors.text }]}
              value={value}
              onChangeText={(t) => { setValue(t); setError(''); }}
              keyboardType="decimal-pad"
              selectTextOnFocus
              returnKeyType="done"
              onSubmitEditing={save}
            />
            <Text style={[styles.bonLabel, { color: colors.textFaint }]}>bons</Text>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Boutons */}
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.cancelBtn, { borderColor: colors.border }]}
              onPress={onClose}
            >
              <Text style={[styles.cancelBtnText, { color: colors.textMuted }]}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveBtn, saving && { opacity: 0.6 }]}
              onPress={save}
              disabled={saving}
            >
              {saving
                ? <ActivityIndicator color="#fff" size="small" />
                : <Check size={16} color="#fff" strokeWidth={2.5} />
              }
              <Text style={styles.saveBtnText}>
                {saving ? 'Sauvegarde…' : 'Enregistrer'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Écran principal
// ---------------------------------------------------------------------------

export default function AdminBaseScreen() {
  const { colors } = useTheme();
  const { referenceCourses, importFiles, refresh } = useReference();
  const [importing, setImporting] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [editCourse, setEditCourse] = useState<ReferenceCourse | null>(null);

  useEffect(() => {
    invalidateCache().then(() => refresh());
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return referenceCourses;
    return referenceCourses.filter(
      (c) =>
        includesNormalized(c.lieuEnlevement, query) ||
        includesNormalized(c.lieuLivraison, query)
    );
  }, [referenceCourses, query]);

  const countMedical = useMemo(
    () => referenceCourses.filter((c) => getEffectiveDomaine(c) === 'medical').length,
    [referenceCourses]
  );
  const countCourse = useMemo(
    () => referenceCourses.filter((c) => getEffectiveDomaine(c) === 'courseCourse').length,
    [referenceCourses]
  );

  const confirmClearAll = () => {
    if (Platform.OS === 'web') {
      const ok = window.confirm('⚠️ Vider toute la base de référence ?\n\nCette action est irréversible. Toutes les courses de référence seront supprimées.');
      if (ok) clearAll();
    } else {
      Alert.alert(
        '⚠️ Vider la base ?',
        'Toutes les courses de référence seront supprimées. Action irréversible.',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Vider', style: 'destructive', onPress: clearAll },
        ]
      );
    }
  };

  const clearAll = async () => {
    setClearing(true);
    setImportMsg(null);
    try {
      const { error } = await supabase.from('reference_courses').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (error) throw error;
      await invalidateCache();
      await refresh();
      setImportMsg('🗑️ Base vidée. Les chauffeurs peuvent réimporter leurs listings.');
    } catch (e) {
      setImportMsg('❌ Erreur lors de la suppression');
    } finally {
      setClearing(false);
    }
  };

  const pickAndImport = async () => {
    setImporting(true);
    setImportMsg(null);
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: [
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/octet-stream',
          'application/pdf',
        ],
        copyToCacheDirectory: true,
        multiple: true,
      });
      if (res.canceled || !res.assets || res.assets.length === 0) {
        setImporting(false);
        return;
      }

      let allInputs: Awaited<ReturnType<typeof parseExcelFile>> = [];
      for (const asset of res.assets) {
        const isPdf =
          asset.name?.toLowerCase().endsWith('.pdf') ||
          asset.mimeType === 'application/pdf';
        if (isPdf) {
          allInputs = allInputs.concat(await parsePdfFile(asset.uri));
        } else {
          allInputs = allInputs.concat(await parseExcelFile(asset.uri));
        }
      }

      const filesToUpload = res.assets.map(a => ({ name: a.name ?? 'fichier inconnu', uri: a.uri }));
      const inserted = await importFiles(allInputs, filesToUpload);
      setImportMsg(`✅ ${inserted} nouvelle${inserted > 1 ? 's' : ''} course${inserted > 1 ? 's' : ''} ajoutée${inserted > 1 ? 's' : ''}`);
    } catch (e) {
      setImportMsg('❌ Erreur lors de l\'import');
    } finally {
      setImporting(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Base de référence</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: '#134024' }]}>
          <Database size={16} color="#fff" />
          <Text style={styles.statNum}>{referenceCourses.length.toLocaleString('fr-FR')}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#2563eb' }]}>
          <Text style={styles.statNum}>{countMedical.toLocaleString('fr-FR')}</Text>
          <Text style={styles.statLabel}>Médical</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#134024', opacity: 0.75 }]}>
          <Text style={styles.statNum}>{countCourse.toLocaleString('fr-FR')}</Text>
          <Text style={styles.statLabel}>Course</Text>
        </View>
      </View>

      {/* Import */}
      <TouchableOpacity
        style={[styles.importBtn, importing && { opacity: 0.6 }]}
        onPress={pickAndImport}
        disabled={importing}
      >
        {importing ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Upload size={18} color="#fff" strokeWidth={2.5} />
        )}
        <Text style={styles.importBtnText}>
          {importing ? 'Import en cours…' : 'Importer un listing (XLS / PDF)'}
        </Text>
      </TouchableOpacity>

      {/* Vider */}
      <TouchableOpacity
        style={[styles.clearBtn, clearing && { opacity: 0.6 }]}
        onPress={confirmClearAll}
        disabled={clearing}
      >
        {clearing
          ? <ActivityIndicator color="#dc2626" size="small" />
          : <Trash2 size={16} color="#dc2626" strokeWidth={2.5} />
        }
        <Text style={styles.clearBtnText}>
          {clearing ? 'Suppression…' : 'Vider toute la base de référence'}
        </Text>
      </TouchableOpacity>

      {importMsg && (
        <View style={[styles.msgBanner, {
          backgroundColor: importMsg.startsWith('✅') ? '#d1fae5'
            : importMsg.startsWith('🗑️') ? '#fef3c7' : '#fee2e2'
        }]}>
          <Text style={[styles.msgText, {
            color: importMsg.startsWith('✅') ? '#065f46'
              : importMsg.startsWith('🗑️') ? '#92400e' : '#991b1b'
          }]}>
            {importMsg}
          </Text>
          <TouchableOpacity onPress={() => setImportMsg(null)}>
            <X size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>
      )}

      {/* Hint édition */}
      {referenceCourses.length > 0 && (
        <Text style={[styles.editHint, { color: colors.textFaint }]}>
          Tape sur une ligne pour modifier départ, livraison, type ou bons.
        </Text>
      )}

      {/* Recherche */}
      <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
        <Search size={16} color={colors.textFaint} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Rechercher une adresse…"
          placeholderTextColor={colors.textFaint}
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <X size={16} color={colors.textFaint} />
          </TouchableOpacity>
        )}
      </View>

      {/* Liste */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id ?? (item.lieuEnlevement + item.lieuLivraison)}
        contentContainerStyle={{ padding: 16, paddingTop: 8, paddingBottom: 80, gap: 8 }}
        renderItem={({ item }) => (
          <CourseRow item={item} colors={colors} onEdit={setEditCourse} />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.textMuted }]}>
            {query ? 'Aucun résultat.' : 'Aucune course en base.'}
          </Text>
        }
      />

      {/* Modal édition prix */}
      <EditPriceModal
        course={editCourse}
        colors={colors}
        onClose={() => setEditCourse(null)}
        onSaved={refresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  title: { fontSize: 30, fontWeight: '900', letterSpacing: -0.8 },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    gap: 4,
  },
  statNum: { color: '#fff', fontSize: 20, fontWeight: '900' },
  statLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: '700' },
  importBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#134024',
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },
  importBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  clearBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    borderWidth: 1.5, borderColor: '#dc2626',
    marginHorizontal: 16, borderRadius: 16, paddingVertical: 12, marginBottom: 12,
  },
  clearBtnText: { color: '#dc2626', fontSize: 14, fontWeight: '700' },
  msgBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
  },
  msgText: { fontSize: 14, fontWeight: '600', flex: 1 },
  editHint: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 6,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 16,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 4,
  },
  searchInput: { flex: 1, fontSize: 15, fontWeight: '500' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    gap: 10,
  },
  rowAddr: { fontSize: 13, fontWeight: '600' },
  tag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  tagText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  qte: { fontSize: 11, fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 60, fontSize: 15, fontWeight: '600' },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    gap: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: '800' },
  routeBox: {
    borderRadius: 14,
    padding: 14,
    gap: 4,
  },
  routeAddr: { fontSize: 13, fontWeight: '600' },
  routeArrow: { fontSize: 12, fontWeight: '700', textAlign: 'center' },
  inputLabel: { fontSize: 12, fontWeight: '600' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  addrInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  priceInput: {
    flex: 1,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  bonLabel: { fontSize: 16, fontWeight: '600' },
  errorText: { color: '#dc2626', fontSize: 13, fontWeight: '600' },
  currentTypeBadge: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 4,
  },
  currentTypeLabel: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  vehGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  vehChip: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  vehChipText: { fontSize: 12, fontWeight: '800' },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelBtnText: { fontSize: 15, fontWeight: '700' },
  saveBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#134024',
    borderRadius: 14,
    paddingVertical: 14,
  },
  saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
