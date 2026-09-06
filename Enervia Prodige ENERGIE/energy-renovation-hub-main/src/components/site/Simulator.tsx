import React, { useState, type ElementType, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  CircleDollarSign,
  Flame,
  Home,
  Layers3,
  LockKeyhole,
  Pencil,
  Plug,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Trees,
  Users,
  Wind,
} from "lucide-react";
import { estimateSavings } from "@/lib/simulator-estimate";
import {
  RenovationProjectSchema,
  energySpendLabel,
  energySpendOptions,
  labels,
  toggleWorkSelection,
  workLabel,
  workOptions,
  type RenovationDraft,
  type RenovationProject,
  type WorkType,
} from "@/lib/simulator-model";

const QUESTION_STEPS = 6;
const workIcons: Record<WorkType, ElementType> = {
  heating: Flame,
  roof: Home,
  walls: Layers3,
  windows: Building2,
  ventilation: Wind,
  global: Sparkles,
  unknown: ShieldCheck,
};

export function Simulator({ variant = "embedded" }: { variant?: "embedded" | "campaign" }) {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<RenovationDraft>({ surfaceArea: 110, works: [] });
  const [error, setError] = useState("");
  const [returnToScenario, setReturnToScenario] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const parsed = RenovationProjectSchema.safeParse(draft);
  const estimate = parsed.success ? estimateSavings(parsed.data) : null;
  const set = (patch: Partial<RenovationDraft>) =>
    setDraft((current) => ({ ...current, ...patch }));

  const next = (target: number) => {
    setError("");
    if (returnToScenario) {
      setReturnToScenario(false);
      setStep(7);
    } else setStep(target);
  };
  const edit = (target: number) => {
    setReturnToScenario(true);
    setStep(target);
  };
  const reset = () => {
    setDraft({ surfaceArea: 110, works: [] });
    setError("");
    setReturnToScenario(false);
    setSummaryOpen(false);
    setConfirmReset(false);
    setStep(1);
  };

  const advance = () => {
    if (step === 1 && !draft.status) return setError("Choisissez votre situation.");
    if (step === 2 && (!/^\d{5}$/.test(draft.postalCode ?? "") || !draft.propertyType))
      return setError("Renseignez un code postal valide et le type de logement.");
    if (step === 3 && !draft.heatingSystem)
      return setError("Choisissez votre chauffage principal.");
    if (step === 5 && !draft.works.length)
      return setError("Sélectionnez au moins un type de travaux.");
    if (step === 6 && !draft.energySpendBracket)
      return setError("Choisissez une tranche, même approximative.");
    next(step + 1);
  };

  const question = step <= QUESTION_STEPS;
  const shellWidth = question ? "max-w-3xl" : "max-w-5xl";

  return (
    <div className={`mx-auto w-full ${shellWidth} transition-[max-width] duration-300 ${variant === "campaign" ? "" : ""}`}>
      <div className="overflow-hidden rounded border border-[#d7cfc3] bg-white shadow-[0_24px_70px_rgba(38,48,41,.1)]">
        {question && <Progress step={step} />}
        <div className={`flex flex-col relative ${question ? "min-h-[400px] bg-white p-6 sm:p-10 lg:p-12" : step === 8 ? "min-h-[500px] bg-[#f5f1e8] p-6 sm:p-10 lg:p-12" : "min-h-[500px] bg-[#f5f1e8]"}`}>
          <div className="flex-1 mx-auto w-full max-w-2xl">
            {step === 1 && (
              <Question
                title="Quelle est votre situation ?"
                text="Cette information permet de situer le porteur du projet."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Option
                    icon={Home}
                    title="Propriétaire"
                    text="Je possède ce bien immobilier."
                    active={draft.status === "proprietaire"}
                    onClick={() => {
                      set({ status: "proprietaire" });
                      next(2);
                    }}
                  />
                  <Option
                    icon={Users}
                    title="Locataire"
                    text="Je loue actuellement ce bien."
                    active={draft.status === "locataire"}
                    onClick={() => {
                      set({ status: "locataire" });
                      next(2);
                    }}
                  />
                </div>
              </Question>
            )}
            {step === 2 && (
              <Question
                title="Quel logement souhaitez-vous rénover ?"
                text="Indiquez sa localisation et sa configuration."
              >
                <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#536159]">
                  Code postal
                  <input
                    autoFocus
                    aria-label="Code postal"
                    inputMode="numeric"
                    value={draft.postalCode ?? ""}
                    onChange={(event) =>
                      set({ postalCode: event.target.value.replace(/\D/g, "").slice(0, 5) })
                    }
                    placeholder="35000"
                    className="mt-2 h-14 w-full border border-[#cfc7bb] bg-white px-4 text-center font-display text-2xl outline-none focus:border-[#b9783e]"
                  />
                </label>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Option
                    icon={Home}
                    title="Maison individuelle"
                    active={draft.propertyType === "maison"}
                    onClick={() => {
                      set({ propertyType: "maison" });
                      if (/^\d{5}$/.test(draft.postalCode ?? "")) {
                        next(3);
                      } else {
                        setError("Renseignez un code postal valide pour continuer.");
                      }
                    }}
                    compact
                  />
                  <Option
                    icon={Building2}
                    title="Appartement"
                    active={draft.propertyType === "appartement"}
                    onClick={() => {
                      set({ propertyType: "appartement" });
                      if (/^\d{5}$/.test(draft.postalCode ?? "")) {
                        next(3);
                      } else {
                        setError("Renseignez un code postal valide pour continuer.");
                      }
                    }}
                    compact
                  />
                </div>
              </Question>
            )}
            {step === 3 && (
              <Question
                title="Quel est votre chauffage principal ?"
                text="Choisissez le système utilisé aujourd’hui."
              >
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      ["fioul", "Fioul", Flame],
                      ["gaz", "Gaz", Flame],
                      ["electricite", "Électricité", Plug],
                      ["bois", "Bois", Trees],
                    ] as const
                  ).map(([value, title, Icon]) => (
                    <Option
                      key={value}
                      icon={Icon}
                      title={title}
                      active={draft.heatingSystem === value}
                      onClick={() => {
                        set({ heatingSystem: value });
                        next(4);
                      }}
                      compact
                    />
                  ))}
                </div>
              </Question>
            )}
            {step === 4 && (
              <Question
                title="Quelle est la surface habitable ?"
                text="Une valeur approximative suffit à cette étape."
              >
                <div className="border border-[#d8d1c6] bg-[#f5f2ec] p-6 text-center">
                  <p className="font-display text-5xl text-[#17221c]">
                    {draft.surfaceArea ?? 110} <span className="text-xl">m²</span>
                  </p>
                  <input
                    type="range"
                    min={10}
                    max={400}
                    step={5}
                    value={draft.surfaceArea ?? 110}
                    onChange={(event) => set({ surfaceArea: Number(event.target.value) })}
                    aria-label="Surface habitable en mètres carrés"
                    className="mt-7 w-full accent-[#b9783e]"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-[#778079]">
                    <span>10 m²</span>
                    <span>400 m²</span>
                  </div>
                </div>
              </Question>
            )}
            {step === 5 && (
              <Question
                title="Quels travaux envisagez-vous ?"
                text="Vous pouvez sélectionner plusieurs réponses."
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  {workOptions.map((option) => (
                    <WorkOption
                      key={option.value}
                      icon={workIcons[option.value]}
                      title={option.label}
                      active={draft.works.includes(option.value)}
                      onClick={() => set({ works: toggleWorkSelection(draft.works, option.value) })}
                    />
                  ))}
                </div>
              </Question>
            )}
            {step === 6 && (
              <Question
                title="Quel est votre budget énergétique moyen ?"
                text="Une tranche mensuelle suffit pour estimer une économie annuelle."
              >
                <div className="grid gap-2">
                  {energySpendOptions.map((option) => (
                    <SimpleOption
                      key={option.value}
                      title={option.label}
                      active={draft.energySpendBracket === option.value}
                      onClick={() => {
                        set({ energySpendBracket: option.value });
                        next(7);
                      }}
                    />
                  ))}
                </div>
              </Question>
            )}
            {step === 7 && parsed.success && estimate && (
              <Scenario
                project={parsed.data}
                estimate={estimate}
                edit={edit}
                open={summaryOpen}
                setOpen={setSummaryOpen}
              />
            )}
            {step === 8 && (
              <LeadCapture
                draft={draft}
                estimate={parsed.success && estimate ? estimate : null}
              />
            )}
            {error && (
              <p role="alert" className="mt-4 text-center text-xs font-semibold text-[#a33f32]">
                {error}
              </p>
            )}
          </div>
          <div className="mx-auto w-full max-w-2xl mt-auto">
            <Actions
              step={step}
              advance={advance}
              back={() => setStep(Math.max(1, step - 1))}
              toContact={() => setStep(8)}
              confirmReset={confirmReset}
              setConfirmReset={setConfirmReset}
              reset={reset}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Progress({ step }: { step: number }) {
  const percent = Math.round((step / 8) * 100);
  return (
    <div className="bg-[#fcfbf9] px-6 py-5 sm:px-10 lg:px-12 border-b border-[#e5e0d8]">
      <div className="flex items-center justify-between text-xs font-bold tracking-widest text-[#a69d8f]">
        <span>ÉTAPE {step} SUR 8</span>
        <span>{percent}%</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#eeeae3]">
        <div
          className="h-full rounded-full bg-[#b9783e] transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
function Question({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <section className="flex flex-col h-full justify-center min-h-[300px]">
      <div className="mb-8">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-[#17221c] sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#6b756f]">{text}</p>
      </div>
      <div>{children}</div>
    </section>
  );
}
function Option({
  icon: Icon,
  title,
  text,
  active,
  onClick,
  compact = false,
}: {
  icon: ElementType;
  title: string;
  text?: string;
  active: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex ${compact ? "min-h-16 flex-row text-left" : "min-h-28 flex-col text-center"} items-center justify-center gap-2 border p-3 transition-colors ${active ? "border-[#b9783e] bg-[#f8ece1]" : "border-[#d9cfc3] bg-white hover:border-[#b9783e]/65"}`}
    >
      <Icon className="size-5 text-[#496153]" />
      <span>
        <span className="block text-sm font-semibold text-[#17221c]">{title}</span>
        {text && <span className="mt-1 block text-[10px] leading-4 text-[#6d7770]">{text}</span>}
      </span>
      {active && <Check className="size-4 text-[#a45f2d]" />}
    </button>
  );
}
function WorkOption({
  icon: Icon,
  title,
  active,
  onClick,
}: {
  icon: ElementType;
  title: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex min-h-12 items-center gap-3 border px-3 text-left ${active ? "border-[#b9783e] bg-[#f8ece1]" : "border-[#d9cfc3] bg-white"}`}
    >
      <Icon className="size-4 shrink-0 text-[#496153]" />
      <span className="flex-1 text-xs font-semibold text-[#26362d]">{title}</span>
      {active && <Check className="size-3.5 text-[#a45f2d]" />}
    </button>
  );
}
function SimpleOption({
  title,
  active,
  onClick,
}: {
  title: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex min-h-11 items-center justify-between border px-4 text-left text-xs font-semibold ${active ? "border-[#b9783e] bg-[#f8ece1]" : "border-[#d9cfc3] bg-white"}`}
    >
      <span>{title}</span>
      <span
        className={`grid size-4 place-items-center border ${active ? "border-[#b9783e] bg-[#b9783e] text-white" : "border-[#aeb8b0]"}`}
      >
        {active && <Check className="size-3" />}
      </span>
    </button>
  );
}

function Actions({
  step,
  advance,
  back,
  toContact,
  confirmReset,
  setConfirmReset,
  reset,
}: {
  step: number;
  advance: () => void;
  back: () => void;
  toContact: () => void;
  confirmReset: boolean;
  setConfirmReset: (value: boolean) => void;
  reset: () => void;
}) {
  return (
    <div className="mt-12 flex items-center justify-between gap-3 border-t border-[#e2dcd2] pt-6">
      <button
        type="button"
        onClick={back}
        disabled={step === 1}
        className="inline-flex min-h-12 items-center gap-2 px-2 text-[13px] font-semibold text-[#17221c] hover:text-[#b9783e] disabled:invisible transition-colors"
      >
        <ArrowLeft className="size-4 text-[#b9783e]" /> Revenir
      </button>
      <div className="flex items-center gap-3">
        {step >= 7 &&
          (confirmReset ? (
            <>
              <button type="button" onClick={() => setConfirmReset(false)} className="text-xs font-semibold">
                Annuler
              </button>
              <button
                type="button"
                onClick={reset}
                className="bg-[#a33f32] px-4 py-2 text-xs font-semibold text-white"
              >
                Confirmer l'effacement
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="inline-flex items-center gap-1.5 text-xs text-[#67716b] hover:text-[#17221c]"
            >
              <RefreshCcw className="size-3.5" /> Recommencer
            </button>
          ))}
        {step <= 6 && (
          <button
            type="button"
            onClick={advance}
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#b9783e] px-6 text-[13px] font-semibold text-white hover:bg-[#a66b36] transition-colors"
          >
            Continuer
          </button>
        )}
        {step === 7 && (
          <button
            type="button"
            onClick={toContact}
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#b9783e] px-6 text-[13px] font-semibold text-white hover:bg-[#a66b36] transition-colors"
          >
            Continuer vers mes coordonnées
          </button>
        )}
      </div>
    </div>
  );
}

/** Icônes inline SVG pour les facteurs d'incertitude */
const uncertaintyIcons: Record<string, React.ReactNode> = {
  default: (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-[#8a9490]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 5v4M8 11v.5" strokeLinecap="round" />
    </svg>
  ),
};
function getUncertaintyIcon(label: string): React.ReactNode {
  if (/météo|tempé/i.test(label))
    return (
      <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-[#8a9490]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="7" r="3" />
        <path d="M8 1v1.5M8 12.5V14M1 7h1.5M12.5 7H14M3.2 3.2l1.1 1.1M10.7 10.7l1.1 1.1M3.2 10.8l1.1-1.1M10.7 5.3l1.1-1.1" strokeLinecap="round" />
        <path d="M4 12.5a3 3 0 0 1 8 0" strokeLinecap="round" />
      </svg>
    );
  if (/usage|facture|inclus/i.test(label))
    return (
      <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-[#8a9490]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="1.5" width="12" height="13" rx="1" />
        <path d="M5 5.5h6M5 8h6M5 10.5h4" strokeLinecap="round" />
      </svg>
    );
  if (/état|qualité|mise en œuvre|mise en oeuvre/i.test(label))
    return (
      <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-[#8a9490]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 8.5 6 12l7-8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (/prix|énergie/i.test(label))
    return (
      <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-[#8a9490]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 12 6 6l3 3 3-5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 4h2v2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  return uncertaintyIcons.default;
}

function Scenario({
  project,
  estimate,
  edit,
  open,
  setOpen,
}: {
  project: RenovationProject;
  estimate: ReturnType<typeof estimateSavings>;
  edit: (step: number) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <section className="relative flex flex-col min-h-[500px]">
      {/* Illustration architecturale en fond */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[55%] opacity-[0.055] hidden lg:block"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 520 480' fill='none' stroke='%2317221c' stroke-width='1'%3E%3Cpath d='M260 60 L420 160 L420 400 L100 400 L100 160 Z'/%3E%3Cpath d='M260 60 L100 160 M260 60 L420 160'/%3E%3Crect x='170' y='270' width='80' height='130'/%3E%3Crect x='290' y='270' width='60' height='80'/%3E%3Crect x='130' y='200' width='50' height='50'/%3E%3Crect x='340' y='200' width='50' height='50'/%3E%3Cpath d='M100 400 L60 400 M420 400 L460 400'/%3E%3Cpath d='M170 400 L170 430 M250 400 L250 430'/%3E%3Cline x1='60' y1='400' x2='460' y2='400'/%3E%3Cpath d='M180 100 L340 100 L340 160 L180 160 Z' stroke-dasharray='4 3'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundSize: "contain",
        }}
      />

      <div className="relative px-6 pt-8 pb-0 sm:px-10 lg:px-12">
        {/* Eyebrow */}
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b9783e]">
          Votre projet
        </p>

        {/* Titre */}
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.06] tracking-[-0.035em] text-[#17221c] sm:text-[2.6rem]">
          Voici le scénario qui correspond à votre logement.
        </h2>

        {/* Bouton Modifier — style bicolore sombre/doré */}
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="mt-7 flex w-full overflow-hidden text-left text-xs font-semibold shadow-sm"
        >
          <span className="flex items-center gap-2 bg-[#b9783e] px-4 py-3.5 text-white shrink-0">
            <Pencil className="size-3.5" />
          </span>
          <span className="flex flex-1 items-center justify-between bg-[#2b3530] px-4 py-3.5 text-white/90">
            Modifier mes réponses
            <ChevronDown className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </span>
        </button>
        {open && <Summary project={project} edit={edit} />}
      </div>

      {/* Carte scénario — sage green */}
      <div className="relative mx-6 mt-5 bg-[#dde8d8] p-6 sm:mx-10 sm:p-8 lg:mx-12">
        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#3f6147]">
          {estimate.potential}
        </p>
        <h3 className="mt-2.5 font-display text-[1.45rem] font-semibold leading-snug text-[#17221c] sm:text-2xl">
          {estimate.scenarioTitle}
        </h3>
        <p className="mt-2 text-sm leading-6 text-[#4a5e50]">{estimate.scenarioBody}</p>
      </div>

      {/* Panneau stats + incertitudes */}
      <div className="relative mx-6 mt-[1px] grid bg-white sm:mx-10 sm:grid-cols-[0.72fr_1.28fr] lg:mx-12">
        {/* Réduction indicative */}
        <div className="border-b border-[#ddd7cc] p-6 sm:border-b-0 sm:border-r sm:p-8">
          <p className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-[#a45f2d]">
            Réduction indicative
          </p>
          <p className="mt-2.5 font-display text-[2.6rem] font-semibold leading-none text-[#17221c]">
            {estimate.percentRange[0]}&thinsp;à&thinsp;{estimate.percentRange[1]}&thinsp;%
          </p>
          {estimate.annualEuroRange && (
            <p className="mt-2.5 text-sm font-semibold text-[#536159]">
              Environ{" "}
              {estimate.annualEuroRange[0].toLocaleString("fr-FR")}&thinsp;à&thinsp;
              {estimate.annualEuroRange[1].toLocaleString("fr-FR")} € par an
            </p>
          )}
          <p className="mt-3 text-[10px] leading-5 text-[#8a9490]">
            Estimation indicative,<br />non contractuelle.
          </p>
        </div>

        {/* Facteurs d'évolution */}
        <div className="p-6 sm:p-8">
          <p className="text-xs font-semibold text-[#17221c]">
            Ce qui peut faire évoluer le résultat
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {estimate.uncertainties.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[11px] leading-[1.45] text-[#556260]">
                {getUncertaintyIcon(item)}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Espace bas pour les actions */}
      <div className="h-6 sm:h-8" />
    </section>
  );
}
function Summary({ project, edit }: { project: RenovationProject; edit: (step: number) => void }) {
  const rows = [
    ["Situation", labels.status[project.status], 1],
    ["Logement", `${project.postalCode} · ${labels.propertyType[project.propertyType]}`, 2],
    ["Chauffage", labels.heatingSystem[project.heatingSystem], 3],
    ["Surface", `${project.surfaceArea} m²`, 4],
    ["Travaux", project.works.map(workLabel).join(", "), 5],
    ["Budget", energySpendLabel(project.energySpendBracket), 6],
  ] as const;
  return (
    <div className="border-x border-b border-[#d8d1c6] bg-white px-4">
      {rows.map(([label, value, target]) => (
        <div
          key={label}
          className="grid gap-1 border-b border-[#e5e0d7] py-2.5 last:border-0 sm:grid-cols-[6rem_1fr_auto] sm:items-center"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#7a837d]">
            {label}
          </span>
          <span className="text-[10px] font-semibold leading-4">{value}</span>
          <button
            type="button"
            onClick={() => edit(target)}
            className="inline-flex min-h-8 items-center gap-1 text-[10px] font-bold text-[#9a582d]"
          >
            <Pencil className="size-3" /> Modifier
          </button>
        </div>
      ))}
    </div>
  );
}
function LeadCapture({
  draft,
  estimate,
}: {
  draft: RenovationDraft;
  estimate: ReturnType<typeof estimateSavings> | null;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rgpdConsent, setRgpdConsent] = useState(false);
  const [phoneConsent, setPhoneConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (status === "success") {
    return (
      <div className="bg-[#F2F1EC] p-10 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.03)] w-full max-w-[420px] border border-[#E0DFD8] mx-auto text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e8eee5] mb-6">
          <Check className="h-8 w-8 text-[#52685a]" />
        </div>
        <h2 className="font-display text-[26px] m-0 mb-2 text-[#222222]">
          Demande envoyée !
        </h2>
        <p className="text-[#666666] text-[14px] mb-6 leading-relaxed">
          Nous avons bien reçu votre demande. Un conseiller ENERVIA RENOV vous répond sous 24 h à{" "}
          <strong>{email}</strong>.
        </p>
        <p className="text-[11px] text-[#888888] leading-5">
          Conformément au RGPD, vous pouvez exercer vos droits (accès, rectification, suppression) à tout moment en écrivant à{" "}
          <a href="mailto:contact@enerviaa.com" className="underline">contact@enerviaa.com</a>.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || name.trim().length < 2) {
      setErrorMsg("Merci de renseigner votre nom complet.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("L'adresse e-mail semble invalide.");
      return;
    }
    if (!rgpdConsent) {
      setErrorMsg("Vous devez accepter le traitement de vos données pour continuer.");
      return;
    }

    // Build simulation summary for the email
    const works = draft.works.map(workLabel).join(", ") || "Non précisé";
    const simulationLines = [
      `Situation : ${draft.status === "proprietaire" ? "Propriétaire" : draft.status === "locataire" ? "Locataire" : "Non précisé"}`,
      `Logement : ${draft.propertyType === "maison" ? "Maison individuelle" : draft.propertyType === "appartement" ? "Appartement" : "Non précisé"} — ${draft.postalCode ?? "CP non renseigné"}`,
      `Surface : ${draft.surfaceArea ?? "Non précisée"} m²`,
      `Chauffage actuel : ${draft.heatingSystem ? labels.heatingSystem[draft.heatingSystem] : "Non précisé"}`,
      `Travaux envisagés : ${works}`,
      `Budget énergie : ${draft.energySpendBracket ? energySpendLabel(draft.energySpendBracket) : "Non précisé"}`,
      estimate
        ? `Estimation indicative : ${estimate.percentRange[0]}–${estimate.percentRange[1]} % d'économies${estimate.annualEuroRange ? ` (${estimate.annualEuroRange[0].toLocaleString("fr-FR")}–${estimate.annualEuroRange[1].toLocaleString("fr-FR")} €/an)` : ""}`
        : "",
      phoneConsent ? "Consentement appel téléphonique : OUI" : "Consentement appel téléphonique : NON",
    ]
      .filter(Boolean)
      .join("\n");

    const projectType = works !== "Non précisé" ? works : "Simulation générale";

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          projectType,
          surface: draft.surfaceArea?.toString() ?? undefined,
          message: `[Lead depuis le simulateur]\n\n${simulationLines}`,
          rgpd: true,
          source: "simulator",
        }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Erreur inconnue.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Une erreur est survenue. Réessayez.");
    }
  };

  const fieldClass =
    "w-full p-3 px-4 border border-[#E0DFD8] rounded text-[14px] bg-white transition-all duration-200 focus:outline-none focus:border-[#C4673A] focus:ring-[3px] focus:ring-[#C4673A]/10";

  return (
    <div className="bg-[#F2F1EC] p-10 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.03)] w-full max-w-[420px] border border-[#E0DFD8] mx-auto">
      <h2 className="font-display text-[26px] m-0 mb-2 text-[#222222]">
        Concrétisons votre projet
      </h2>
      <p className="text-[#666666] text-[14px] mb-6 leading-relaxed">
        Laissez vos coordonnées pour qu'un conseiller vous réponde sous 24 h.
      </p>

      {/* Encart RGPD informatif */}
      <div className="mb-6 border border-[#d7cfc3] bg-white/70 p-4 text-[11px] leading-5 text-[#666666]">
        <p className="font-semibold text-[#444444] mb-1">Protection de vos données — RGPD</p>
        <p>
          ENERVIA RENOV collecte vos données (nom, e-mail, téléphone) dans le seul but de vous
          contacter pour chiffrer votre projet de rénovation énergétique. Base légale : votre
          consentement. Conservation : durée de la relation commerciale + 5 ans. Responsable du
          traitement : Sakala Prodige, ENERVIA RENOV, 58 rue de Monceau, 75008 Paris.
        </p>
        <p className="mt-1">
          Vous pouvez retirer votre consentement à tout moment :{" "}
          <a href="mailto:contact@enerviaa.com" className="underline text-[#9a582d]">
            contact@enerviaa.com
          </a>
          . Droit de réclamation auprès de la{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="underline text-[#9a582d]">CNIL</a>.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-5 text-left">
          <label htmlFor="lead-nom" className="block text-[13px] font-semibold mb-2 text-[#222222]">
            Nom complet <span className="text-[#C4673A]">*</span>
          </label>
          <input
            type="text" id="lead-nom" required
            placeholder="Prénom Nom"
            value={name} onChange={(e) => setName(e.target.value)}
            className={fieldClass}
            autoComplete="name"
          />
        </div>

        <div className="mb-5 text-left">
          <label htmlFor="lead-email" className="block text-[13px] font-semibold mb-2 text-[#222222]">
            Adresse e-mail <span className="text-[#C4673A]">*</span>
          </label>
          <input
            type="email" id="lead-email" required
            placeholder="vous@exemple.fr"
            value={email} onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
            autoComplete="email"
          />
        </div>

        <div className="mb-5 text-left">
          <label htmlFor="lead-telephone" className="block text-[13px] font-semibold mb-2 text-[#222222]">
            Téléphone <span className="font-normal text-[#888888]">(optionnel)</span>
          </label>
          <input
            type="tel" id="lead-telephone"
            placeholder="06 XX XX XX XX"
            value={phone} onChange={(e) => setPhone(e.target.value)}
            className={fieldClass}
            autoComplete="tel"
          />
        </div>

        {/* Consentement RGPD — obligatoire */}
        <div className="mb-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={rgpdConsent}
              onChange={(e) => { setRgpdConsent(e.target.checked); if (e.target.checked) setErrorMsg(""); }}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#C4673A] cursor-pointer"
            />
            <span className="text-[12px] leading-5 text-[#444444]">
              <span className="font-semibold">Obligatoire</span> — J'accepte que mes données soient utilisées par ENERVIA RENOV pour me contacter concernant mon projet, conformément à la{" "}
              <a href="/politique-de-confidentialite" className="underline text-[#9a582d]">politique de confidentialité</a>.
            </span>
          </label>
        </div>

        {/* Consentement téléphonique — opt-in explicite loi n° 2025-594 */}
        <div className="mb-5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={phoneConsent}
              onChange={(e) => setPhoneConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#C4673A] cursor-pointer"
            />
            <span className="text-[12px] leading-5 text-[#444444]">
              <span className="font-semibold">Facultatif</span> — J'accepte d'être contacté par téléphone par ENERVIA RENOV à des fins de prospection. Révocable à tout moment à{" "}
              <a href="mailto:contact@enerviaa.com" className="underline text-[#9a582d]">contact@enerviaa.com</a>.
            </span>
          </label>
        </div>

        {errorMsg && (
          <p role="alert" className="mb-4 text-[12px] font-semibold text-red-600">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-[#C4673A] text-white border-none p-[14px] text-[16px] font-medium rounded cursor-pointer transition-colors duration-200 hover:bg-[#A8562E] mt-2 disabled:opacity-60 disabled:cursor-wait flex items-center justify-center gap-3"
        >
          {status === "sending" ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Envoi…
            </>
          ) : (
            "Recevoir mon estimation"
          )}
        </button>
      </form>

      <div className="text-[12px] text-[#666666] text-center mt-5 flex items-center justify-center gap-2">
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 7H12.5C13.3284 7 14 7.67157 14 8.5V14.5C14 15.3284 13.3284 16 12.5 16H1.5C0.671573 16 0 15.3284 0 14.5V8.5C0 7.67157 0.671573 7 1.5 7H2V5C2 2.23858 4.23858 0 7 0C9.76142 0 12 2.23858 12 5V7ZM7 12.5C7.82843 12.5 8.5 11.8284 8.5 11C8.5 10.1716 7.82843 9.5 7 9.5C6.17157 9.5 5.5 10.1716 5.5 11C5.5 11.8284 6.17157 12.5 7 12.5ZM10 7V5C10 3.34315 8.65685 2 7 2C5.34315 2 4 3.34315 4 5V7H10Z" fill="#C4673A"/>
        </svg>
        Données confidentielles · Réponse sous 24 h
      </div>
    </div>
  );
}
