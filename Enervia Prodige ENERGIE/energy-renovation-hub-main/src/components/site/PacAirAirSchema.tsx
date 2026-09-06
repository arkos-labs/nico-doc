/**
 * Schéma de fonctionnement PAC air/air
 * Deux cycles : Chauffage (haut) et Rafraîchissement (bas)
 * SVG inline — aucune dépendance image externe
 */
export function PacAirAirSchema() {
  return (
    <figure className="overflow-hidden rounded border border-[#d2ccc1] bg-white shadow-sm">
      <div className="border-b border-[#e8e2d8] bg-[#f8f5f0] px-5 py-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a6034]">
          Schéma de fonctionnement
        </p>
        <p className="mt-0.5 text-xs font-semibold text-[#17221c]">
          Pompe à chaleur air / air — cycles chauffage & rafraîchissement
        </p>
      </div>

      <svg
        viewBox="0 0 900 560"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Schéma de fonctionnement d'une pompe à chaleur air/air en mode chauffage et rafraîchissement"
        role="img"
        className="w-full"
      >
        <defs>
          {/* Flèche rouge */}
          <marker id="arrow-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 Z" fill="#c0392b" />
          </marker>
          {/* Flèche bleue */}
          <marker id="arrow-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 Z" fill="#2980b9" />
          </marker>
          {/* Flèche rouge inversée */}
          <marker id="arrow-red-r" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
            <path d="M8,0 L8,6 L0,3 Z" fill="#c0392b" />
          </marker>
          {/* Flèche bleue inversée */}
          <marker id="arrow-blue-r" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
            <path d="M8,0 L8,6 L0,3 Z" fill="#2980b9" />
          </marker>
          {/* Flèche grise air */}
          <marker id="arrow-gray" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <path d="M0,0 L0,5 L7,2.5 Z" fill="#8a948e" />
          </marker>
          <marker id="arrow-gray-r" markerWidth="7" markerHeight="5" refX="0" refY="2.5" orient="auto">
            <path d="M7,0 L7,5 L0,2.5 Z" fill="#8a948e" />
          </marker>
          {/* Flèche rouge sortie chaleur */}
          <marker id="arrow-red-big" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto">
            <path d="M0,0 L0,8 L10,4 Z" fill="#c0392b" />
          </marker>
          {/* Flèche bleue sortie froid */}
          <marker id="arrow-blue-big" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto">
            <path d="M0,0 L0,8 L10,4 Z" fill="#2980b9" />
          </marker>
        </defs>

        {/* ══════════════════════════════════════════
            TITRE GLOBAL
        ══════════════════════════════════════════ */}
        <text x="450" y="32" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="800" fill="#1a2b24" letterSpacing="2">
          FONCTIONNEMENT PAC AIR / AIR
        </text>

        {/* ══════════════════════════════════════════
            CYCLE 1 — CHAUFFAGE (y 55 → 250)
        ══════════════════════════════════════════ */}
        <text x="450" y="72" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#c0392b" letterSpacing="1.5">
          CHAUFFAGE
        </text>

        {/* ── Unité extérieure ── */}
        <rect x="30" y="85" width="160" height="130" rx="6" fill="#f0f4f2" stroke="#3d5a45" strokeWidth="2" />
        {/* Ventilateur extérieur */}
        <circle cx="80" cy="150" r="30" fill="none" stroke="#3d5a45" strokeWidth="1.5" />
        <circle cx="80" cy="150" r="5" fill="#3d5a45" />
        <path d="M80,120 Q90,135 80,150 Q70,135 80,120Z" fill="#3d5a45" opacity="0.5" />
        <path d="M110,150 Q95,160 80,150 Q95,140 110,150Z" fill="#3d5a45" opacity="0.5" />
        <path d="M80,180 Q70,165 80,150 Q90,165 80,180Z" fill="#3d5a45" opacity="0.5" />
        <path d="M50,150 Q65,140 80,150 Q65,160 50,150Z" fill="#3d5a45" opacity="0.5" />
        {/* Serpentin extérieur (bleu — absorbe calories de l'air) */}
        <path d="M120,100 Q140,100 140,115 Q140,130 120,130 Q140,130 140,145 Q140,160 120,160 Q140,160 140,175 Q140,190 120,190" stroke="#2980b9" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* Label */}
        <text x="110" y="224" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="700" fill="#1a2b24">UNITÉ EXTÉRIEURE</text>

        {/* Air extérieur entrant */}
        <line x1="2" y1="150" x2="28" y2="150" stroke="#8a948e" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrow-gray)" />
        <text x="2" y="140" fontFamily="system-ui, sans-serif" fontSize="9" fill="#8a948e" fontWeight="600">OUTDOOR</text>
        <text x="2" y="152" fontFamily="system-ui, sans-serif" fontSize="9" fill="#8a948e" fontWeight="600">AMBIENT</text>

        {/* ── Compresseur ── */}
        <ellipse cx="380" cy="108" rx="30" ry="36" fill="#e8e2d8" stroke="#5a6b61" strokeWidth="2" />
        <text x="380" y="104" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="700" fill="#3d5a45">COMPRES-</text>
        <text x="380" y="116" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="700" fill="#3d5a45">SEUR</text>

        {/* ── Détendeur ── */}
        <rect x="362" y="168" width="36" height="26" rx="4" fill="#e8e2d8" stroke="#5a6b61" strokeWidth="1.5" />
        <text x="380" y="183" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="700" fill="#3d5a45">DÉTENDEUR</text>

        {/* ── Unité intérieure ── */}
        <rect x="620" y="85" width="220" height="130" rx="6" fill="#f0f4f2" stroke="#3d5a45" strokeWidth="2" />
        {/* Serpentin intérieur (rouge — diffuse la chaleur) */}
        <path d="M640,100 Q650,100 650,115 Q650,130 640,130 Q650,130 650,145 Q650,160 640,160 Q650,160 650,175 Q650,190 640,190" stroke="#c0392b" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* Ventilateur intérieur */}
        <circle cx="745" cy="150" r="28" fill="none" stroke="#3d5a45" strokeWidth="1.5" />
        <circle cx="745" cy="150" r="4.5" fill="#3d5a45" />
        <path d="M745,122 Q755,136 745,150 Q735,136 745,122Z" fill="#3d5a45" opacity="0.5" />
        <path d="M773,150 Q759,160 745,150 Q759,140 773,150Z" fill="#3d5a45" opacity="0.5" />
        <path d="M745,178 Q735,164 745,150 Q755,164 745,178Z" fill="#3d5a45" opacity="0.5" />
        <path d="M717,150 Q731,140 745,150 Q731,160 717,150Z" fill="#3d5a45" opacity="0.5" />
        {/* Grille de soufflage */}
        <rect x="790" y="120" width="40" height="60" rx="3" fill="#d9e8df" stroke="#3d5a45" strokeWidth="1" />
        {[130, 140, 150, 160, 170].map((y) => (
          <line key={y} x1="793" y1={y} x2="827" y2={y} stroke="#3d5a45" strokeWidth="0.8" />
        ))}
        {/* Label */}
        <text x="730" y="224" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="700" fill="#1a2b24">UNITÉ INTÉRIEURE</text>

        {/* Flèche air chaud sortant */}
        <path d="M830,140 L870,140" stroke="#c0392b" strokeWidth="4" markerEnd="url(#arrow-red-big)" />
        <text x="838" y="125" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="700" fill="#c0392b">AIR CHAUD</text>

        {/* Flèche indoor ambient */}
        <line x1="840" y1="162" x2="832" y2="162" stroke="#8a948e" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrow-gray-r)" />
        <text x="843" y="158" fontFamily="system-ui, sans-serif" fontSize="9" fill="#8a948e" fontWeight="600">INDOOR</text>
        <text x="843" y="170" fontFamily="system-ui, sans-serif" fontSize="9" fill="#8a948e" fontWeight="600">AMBIENT</text>

        {/* ── Circuits fluide frigorigène — CHAUFFAGE ── */}
        {/* Rouge HP : unité ext → compresseur → unité int (vapeur HP) */}
        <path d="M150,108 L350,108" stroke="#c0392b" strokeWidth="3" markerEnd="url(#arrow-red)" fill="none" />
        <path d="M410,108 L620,108" stroke="#c0392b" strokeWidth="3" markerEnd="url(#arrow-red)" fill="none" />
        {/* Label vapeur HP */}
        <text x="450" y="96" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9.5" fontWeight="700" fill="#c0392b">FLUIDE FRIGORIGÈNE</text>
        <text x="450" y="108" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8.5" fill="#c0392b">Vapeur HP</text>

        {/* Bleu BP : unité int → détendeur → unité ext (liquide BP) */}
        <path d="M620,192 L398,192" stroke="#2980b9" strokeWidth="3" markerEnd="url(#arrow-blue-r)" fill="none" />
        <path d="M362,192 L150,192" stroke="#2980b9" strokeWidth="3" markerEnd="url(#arrow-blue-r)" fill="none" />
        {/* Label liquide BP */}
        <text x="450" y="210" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9.5" fontWeight="700" fill="#2980b9">FLUIDE FRIGORIGÈNE</text>
        <text x="450" y="222" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8.5" fill="#2980b9">Liquide BP</text>

        {/* Connexion compresseur → bas (vers détendeur) */}
        <line x1="380" y1="144" x2="380" y2="168" stroke="#5a6b61" strokeWidth="2" strokeDasharray="3 2" />

        {/* ══════════════════════════════════════════
            SÉPARATEUR
        ══════════════════════════════════════════ */}
        <line x1="30" y1="268" x2="870" y2="268" stroke="#c9c2b6" strokeWidth="1.5" />
        <text x="450" y="285" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#2980b9" letterSpacing="1.5">
          RAFRAÎCHISSEMENT
        </text>

        {/* ══════════════════════════════════════════
            CYCLE 2 — RAFRAÎCHISSEMENT (y 295 → 490)
        ══════════════════════════════════════════ */}

        {/* ── Unité extérieure ── */}
        <rect x="30" y="298" width="160" height="130" rx="6" fill="#f0f4f2" stroke="#3d5a45" strokeWidth="2" />
        {/* Ventilateur */}
        <circle cx="80" cy="363" r="30" fill="none" stroke="#3d5a45" strokeWidth="1.5" />
        <circle cx="80" cy="363" r="5" fill="#3d5a45" />
        <path d="M80,333 Q90,348 80,363 Q70,348 80,333Z" fill="#3d5a45" opacity="0.5" />
        <path d="M110,363 Q95,373 80,363 Q95,353 110,363Z" fill="#3d5a45" opacity="0.5" />
        <path d="M80,393 Q70,378 80,363 Q90,378 80,393Z" fill="#3d5a45" opacity="0.5" />
        <path d="M50,363 Q65,353 80,363 Q65,373 50,363Z" fill="#3d5a45" opacity="0.5" />
        {/* Serpentin extérieur (rouge — dissipe la chaleur vers l'extérieur) */}
        <path d="M120,313 Q140,313 140,328 Q140,343 120,343 Q140,343 140,358 Q140,373 120,373 Q140,373 140,388 Q140,403 120,403" stroke="#c0392b" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* Label */}
        <text x="110" y="437" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="700" fill="#1a2b24">UNITÉ EXTÉRIEURE</text>

        {/* Air extérieur */}
        <line x1="2" y1="363" x2="28" y2="363" stroke="#8a948e" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrow-gray)" />
        <text x="2" y="353" fontFamily="system-ui, sans-serif" fontSize="9" fill="#8a948e" fontWeight="600">OUTDOOR</text>
        <text x="2" y="365" fontFamily="system-ui, sans-serif" fontSize="9" fill="#8a948e" fontWeight="600">AMBIENT</text>

        {/* ── Compresseur ── */}
        <ellipse cx="380" cy="318" rx="30" ry="36" fill="#e8e2d8" stroke="#5a6b61" strokeWidth="2" />
        <text x="380" y="314" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="700" fill="#3d5a45">COMPRES-</text>
        <text x="380" y="326" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="700" fill="#3d5a45">SEUR</text>

        {/* ── Détendeur ── */}
        <rect x="362" y="378" width="36" height="26" rx="4" fill="#e8e2d8" stroke="#5a6b61" strokeWidth="1.5" />
        <text x="380" y="393" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="700" fill="#3d5a45">DÉTENDEUR</text>

        {/* ── Unité intérieure ── */}
        <rect x="620" y="298" width="220" height="130" rx="6" fill="#f0f4f2" stroke="#3d5a45" strokeWidth="2" />
        {/* Serpentin intérieur (bleu — absorbe la chaleur de l'air intérieur) */}
        <path d="M640,313 Q650,313 650,328 Q650,343 640,343 Q650,343 650,358 Q650,373 640,373 Q650,373 650,388 Q650,403 640,403" stroke="#2980b9" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* Ventilateur */}
        <circle cx="745" cy="363" r="28" fill="none" stroke="#3d5a45" strokeWidth="1.5" />
        <circle cx="745" cy="363" r="4.5" fill="#3d5a45" />
        <path d="M745,335 Q755,349 745,363 Q735,349 745,335Z" fill="#3d5a45" opacity="0.5" />
        <path d="M773,363 Q759,373 745,363 Q759,353 773,363Z" fill="#3d5a45" opacity="0.5" />
        <path d="M745,391 Q735,377 745,363 Q755,377 745,391Z" fill="#3d5a45" opacity="0.5" />
        <path d="M717,363 Q731,353 745,363 Q731,373 717,363Z" fill="#3d5a45" opacity="0.5" />
        {/* Grille de soufflage */}
        <rect x="790" y="333" width="40" height="60" rx="3" fill="#d0e6f5" stroke="#2980b9" strokeWidth="1" />
        {[343, 353, 363, 373, 383].map((y) => (
          <line key={y} x1="793" y1={y} x2="827" y2={y} stroke="#2980b9" strokeWidth="0.8" />
        ))}
        {/* Label */}
        <text x="730" y="437" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="700" fill="#1a2b24">UNITÉ INTÉRIEURE</text>

        {/* Flèche air froid sortant */}
        <path d="M830,353 L870,353" stroke="#2980b9" strokeWidth="4" markerEnd="url(#arrow-blue-big)" />
        <text x="838" y="340" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="700" fill="#2980b9">AIR FROID</text>

        {/* Indoor ambient */}
        <line x1="840" y1="375" x2="832" y2="375" stroke="#8a948e" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrow-gray-r)" />
        <text x="843" y="371" fontFamily="system-ui, sans-serif" fontSize="9" fill="#8a948e" fontWeight="600">INDOOR</text>
        <text x="843" y="383" fontFamily="system-ui, sans-serif" fontSize="9" fill="#8a948e" fontWeight="600">AMBIENT</text>

        {/* ── Circuits fluide frigorigène — RAFRAÎCHISSEMENT ── */}
        {/* En rafraîchissement : le cycle s'inverse
            Vapeur HP : unité int → compresseur → unité ext (dissipe chaleur dehors) */}
        <path d="M620,318 L410,318" stroke="#c0392b" strokeWidth="3" markerEnd="url(#arrow-red-r)" fill="none" />
        <path d="M350,318 L150,318" stroke="#c0392b" strokeWidth="3" markerEnd="url(#arrow-red-r)" fill="none" />
        {/* Label */}
        <text x="450" y="307" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9.5" fontWeight="700" fill="#c0392b">FLUIDE FRIGORIGÈNE</text>
        <text x="450" y="319" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8.5" fill="#c0392b">Vapeur HP</text>

        {/* Bleu BP : unité ext → détendeur → unité int (absorbe chaleur intérieure) */}
        <path d="M150,404 L362,404" stroke="#2980b9" strokeWidth="3" markerEnd="url(#arrow-blue)" fill="none" />
        <path d="M398,404 L620,404" stroke="#2980b9" strokeWidth="3" markerEnd="url(#arrow-blue)" fill="none" />
        {/* Label */}
        <text x="450" y="422" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9.5" fontWeight="700" fill="#2980b9">FLUIDE FRIGORIGÈNE</text>
        <text x="450" y="434" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8.5" fill="#2980b9">Liquide BP</text>

        {/* Connexion compresseur → détendeur */}
        <line x1="380" y1="354" x2="380" y2="378" stroke="#5a6b61" strokeWidth="2" strokeDasharray="3 2" />

        {/* ══════════════════════════════════════════
            LÉGENDE
        ══════════════════════════════════════════ */}
        <rect x="270" y="480" width="360" height="68" rx="5" fill="#f8f5f0" stroke="#d2ccc1" strokeWidth="1" />
        <text x="450" y="498" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="700" fill="#5a6b61" letterSpacing="1">LÉGENDE</text>
        {/* Rouge */}
        <line x1="290" y1="515" x2="330" y2="515" stroke="#c0392b" strokeWidth="3" markerEnd="url(#arrow-red)" />
        <text x="338" y="519" fontFamily="system-ui, sans-serif" fontSize="9" fill="#3d3d3d">Fluide frigorigène vapeur HP (haute pression)</text>
        {/* Bleu */}
        <line x1="290" y1="535" x2="330" y2="535" stroke="#2980b9" strokeWidth="3" markerEnd="url(#arrow-blue)" />
        <text x="338" y="539" fontFamily="system-ui, sans-serif" fontSize="9" fill="#3d3d3d">Fluide frigorigène liquide BP (basse pression)</text>
      </svg>

      <figcaption className="border-t border-[#e8e2d8] px-5 py-3 text-xs leading-5 text-[#8a948e]">
        En mode chauffage, la PAC extrait les calories de l'air extérieur (même par temps froid) et les restitue à l'intérieur. En mode rafraîchissement, le cycle s'inverse : la chaleur intérieure est absorbée et rejetée à l'extérieur.
      </figcaption>
    </figure>
  );
}
