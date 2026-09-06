import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Check,
  Clock3,
  Home,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Send,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/site/Layout";
import { BASE_URL,  siteIdentity, publicationLabel } from "@/lib/site-identity";

const title = `Contact | ${siteIdentity.commercialName}`;
const description =
  "Contactez ENERVIA pour votre projet de rénovation énergétique. Pompe à chaleur, isolation, aides 2026 — réponse sous 24 h.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE_URL}/contact` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/contact` }],
  }),
  component: ContactPage,
});

// ─── Types ──────────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  surface: string;
  message: string;
  rgpd: boolean;
}

const PROJECT_TYPES = [
  "Pompe à chaleur air/eau",
  "Pompe à chaleur air/air",
  "Pompe à chaleur géothermique",
  "Isolation des combles",
  "Isolation des murs (ITE/ITI)",
  "Isolation des planchers",
  "Fenêtres et menuiseries",
  "VMC / Ventilation",
  "Rénovation d'ampleur (plusieurs travaux)",
  "Rénovation d'immeuble",
  "Audit énergétique",
  "Autre projet",
];

// ─── Component ──────────────────────────────────────────────────────────────

function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    surface: "",
    message: "",
    rgpd: false,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (patch: Partial<FormData>) => setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Client-side validation
    if (!form.name.trim() || form.name.trim().length < 2) {
      setErrorMsg("Merci de renseigner votre nom complet.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrorMsg("L'adresse e-mail semble invalide.");
      return;
    }
    if (!form.projectType) {
      setErrorMsg("Veuillez sélectionner un type de projet.");
      return;
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      setErrorMsg("Votre message est trop court (10 caractères minimum).");
      return;
    }
    if (!form.rgpd) {
      setErrorMsg("Vous devez accepter la politique de confidentialité pour envoyer le formulaire.");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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

  const inputClass =
    "mt-2 min-h-12 w-full border border-[#c9c2b6] bg-[#faf8f4] px-4 text-sm text-[#17221c] placeholder:text-[#9a9f9b] focus:border-[#b9783e] focus:outline-none focus:ring-2 focus:ring-[#b9783e]/20 transition-colors";

  return (
    <PageShell>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <header className="bg-[#111814] text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d9a66e]">
              Nous contacter
            </p>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.04] tracking-[-0.04em] sm:text-6xl text-white">
              Préparons votre projet de rénovation.
            </h1>
            <p className="mt-7 text-base leading-8 text-white/65 sm:text-lg">
              Décrivez votre projet et nous vous répondons sous 24 h ouvrées.
              Estimation, aides disponibles, artisans RGE : on fait le point ensemble.
            </p>
          </div>
        </div>
      </header>

      {/* ── Contenu Principal ─────────────────────────────────────────── */}
      <section className="bg-[#f2efe7] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.55fr_1.45fr] lg:gap-16">
          
          {/* Colonne gauche : Infos de contact */}
          <div className="flex flex-col gap-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a6034] mb-2">
              Nos coordonnées
            </p>

            <div className="flex items-start gap-4 border-l-[3px] border-[#b9783e] bg-white p-5 shadow-[0_8px_30px_rgba(23,34,28,.04)]">
              <Mail className="mt-0.5 size-5 shrink-0 text-[#b9783e]" aria-hidden />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#9a6034]">E-mail</p>
                <a
                  href={`mailto:${publicationLabel(siteIdentity.contactEmail)}`}
                  className="mt-1 block text-sm font-semibold text-[#17221c] transition-colors hover:text-[#b9783e]"
                >
                  {publicationLabel(siteIdentity.contactEmail)}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 border-l-[3px] border-[#b9783e] bg-white p-5 shadow-[0_8px_30px_rgba(23,34,28,.04)]">
              <Phone className="mt-0.5 size-5 shrink-0 text-[#b9783e]" aria-hidden />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#9a6034]">Téléphone</p>
                <a
                  href={`tel:${publicationLabel(siteIdentity.contactPhone)}`}
                  className="mt-1 block text-sm font-semibold text-[#17221c] transition-colors hover:text-[#b9783e]"
                >
                  {publicationLabel(siteIdentity.contactPhone)}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 border-l-[3px] border-[#b9783e] bg-white p-5 shadow-[0_8px_30px_rgba(23,34,28,.04)]">
              <Clock3 className="mt-0.5 size-5 shrink-0 text-[#b9783e]" aria-hidden />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#9a6034]">Disponibilité</p>
                <p className="mt-1 text-sm font-medium text-[#465149]">Lun – Ven : 9h00 – 18h00</p>
              </div>
            </div>

            <div className="flex items-start gap-4 border-l-[3px] border-[#b9783e] bg-white p-5 shadow-[0_8px_30px_rgba(23,34,28,.04)]">
              <MapPin className="mt-0.5 size-5 shrink-0 text-[#b9783e]" aria-hidden />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#9a6034]">Adresse</p>
                <p className="mt-1 text-sm font-medium text-[#465149]">{publicationLabel(siteIdentity.registeredAddress)}</p>
              </div>
            </div>
          </div>

          {/* Colonne droite : Formulaire */}
          <div className="bg-white p-6 shadow-[0_22px_70px_rgba(23,34,28,.08)] sm:p-9">
            {status === "success" ? (
              <div className="flex flex-col items-start gap-6 py-8">
                <div className="flex size-14 items-center justify-center bg-[#23382d]">
                  <Check className="size-7 text-white" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-[#17221c]">
                    Message bien reçu !
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#566159]">
                    Nous reviendrons vers vous sous 24 h ouvrées à l'adresse{" "}
                    <strong className="text-[#17221c]">{form.email}</strong>.
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#566159]">
                    En attendant, vous pouvez utiliser notre simulateur pour affiner votre estimation.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    to="/simulation"
                    hash="simulateur"
                    className="inline-flex items-center gap-2 bg-[#b9783e] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c9894e]"
                  >
                    Lancer le simulateur <ArrowRight className="size-4" aria-hidden />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setForm({ name: "", email: "", phone: "", projectType: "", surface: "", message: "", rgpd: false });
                    }}
                    className="inline-flex items-center gap-2 border border-[#c9c2b6] px-5 py-3 text-sm font-semibold text-[#35443c] transition-colors hover:bg-[#f2efe7]"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid gap-6">
                  
                  {/* Nom + Email */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="text-sm font-semibold text-[#17221c]">
                      Nom complet <span className="text-[#b9783e]">*</span>
                      <input
                        className={inputClass}
                        type="text"
                        placeholder="Prénom Nom"
                        value={form.name}
                        onChange={(e) => set({ name: e.target.value })}
                        autoComplete="name"
                        required
                      />
                    </label>
                    <label className="text-sm font-semibold text-[#17221c]">
                      Adresse e-mail <span className="text-[#b9783e]">*</span>
                      <input
                        className={inputClass}
                        type="email"
                        placeholder="vous@exemple.fr"
                        value={form.email}
                        onChange={(e) => set({ email: e.target.value })}
                        autoComplete="email"
                        required
                      />
                    </label>
                  </div>

                  {/* Téléphone + Type projet */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="text-sm font-semibold text-[#17221c]">
                      Téléphone
                      <input
                        className={inputClass}
                        type="tel"
                        placeholder="06 XX XX XX XX"
                        value={form.phone}
                        onChange={(e) => set({ phone: e.target.value })}
                        autoComplete="tel"
                      />
                    </label>
                    <label className="text-sm font-semibold text-[#17221c]">
                      Type de projet <span className="text-[#b9783e]">*</span>
                      <select
                        className={`${inputClass} cursor-pointer`}
                        value={form.projectType}
                        onChange={(e) => set({ projectType: e.target.value })}
                        required
                      >
                        <option value="" disabled>
                          Sélectionner…
                        </option>
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  {/* Surface */}
                  <label className="text-sm font-semibold text-[#17221c]">
                    Surface habitable approximative (m²)
                    <input
                      className={inputClass}
                      type="number"
                      min="1"
                      max="9999"
                      placeholder="ex : 120"
                      value={form.surface}
                      onChange={(e) => set({ surface: e.target.value })}
                    />
                    <span className="mt-1 block text-xs font-normal text-[#9a9f9b]">
                      Optionnel — aide à mieux estimer les travaux
                    </span>
                  </label>

                  {/* Message */}
                  <label className="text-sm font-semibold text-[#17221c]">
                    Votre message <span className="text-[#b9783e]">*</span>
                    <textarea
                      className={`${inputClass} min-h-36 py-3 resize-y`}
                      placeholder="Décrivez votre projet, votre logement (type, année de construction, chauffage actuel), et vos objectifs…"
                      value={form.message}
                      onChange={(e) => set({ message: e.target.value })}
                      required
                    />
                  </label>

                  {/* RGPD */}
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-[#566159]">
                    <input
                      type="checkbox"
                      className="mt-0.5 size-4 shrink-0 accent-[#b9783e]"
                      checked={form.rgpd}
                      onChange={(e) => set({ rgpd: e.target.checked })}
                      required
                    />
                    <span>
                      J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la{" "}
                      <Link
                        to="/politique-de-confidentialite"
                        className="font-semibold text-[#8f552f] underline underline-offset-4 hover:text-[#6f411e]"
                      >
                        politique de confidentialité
                      </Link>
                      . <span className="text-[#b9783e]">*</span>
                    </span>
                  </label>

                  {/* Erreur */}
                  {errorMsg && (
                    <p role="alert" className="border-l-4 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {errorMsg}
                    </p>
                  )}

                  {/* Bouton */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-2 inline-flex min-h-13 w-full items-center justify-center gap-3 bg-[#b9783e] px-7 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#c9894e] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        Envoyer le message <Send className="size-4" aria-hidden />
                      </>
                    )}
                  </button>

                  {/* Note sécurité */}
                  <div className="flex items-center gap-2 text-xs text-[#8a9490]">
                    <LockKeyhole className="size-3.5 shrink-0 text-[#3f6c50]" aria-hidden />
                    Connexion sécurisée · Données non revendues · Réponse sous 24 h ouvrées
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
