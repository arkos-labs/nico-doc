export const BASE_URL = "https://www.enervia.fr";

export type PublicationValue = { status: "known"; value: string } | { status: "missing" };

const missing = (): PublicationValue => ({ status: "missing" });
const known = (value: string): PublicationValue => ({ status: "known", value });

export const siteIdentity = {
  commercialName: "ENERVIA",
  legalName: known("ENERVIA"),
  legalForm: known("SASU"),
  capital: known("1 500 €"),
  registeredAddress: known("58 rue de Monceau, 75008 Paris"),
  registration: known("108 274 549 R.C.S. Paris"),
  publicationDirector: known("Gérant d'Enervia"),
  contactEmail: known("contact@enerviaa.com"),
  contactPhone: known("+33 7 53 56 72 58"),
  host: known(
    "Vercel Inc. — 340 Pine Street, Suite 701, San Francisco, CA 94104, USA — https://vercel.com"
  ),
  dataController: known("Gérant d'Enervia — contact@enerviaa.com"),
  rightsContact: known("contact@enerviaa.com"),
  retentionPeriod: known("durée de la relation commerciale augmentée de 5 ans"),
  lastUpdated: "13 août 2026",
} as const;

export function publicationLabel(value: PublicationValue): string {
  return value.status === "known" ? value.value : "À compléter avant publication";
}

/** Schéma Schema.org complet pour l'organisation — injecté en JSON-LD */
export const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "HVACBusiness"],
  "@id": "https://www.enervia.fr/#organization",
  name: "ENERVIA",
  url: "https://www.enervia.fr",
  logo: "https://www.enervia.fr/logo.png",
  description:
    "Spécialiste de la rénovation énergétique globale en France. Expertise en pompes à chaleur (R290, R32, SCOP/SEER), isolation thermique (ITE, combles DTU 45.10, planchers) et accompagnement des aides MaPrimeRénov' 2026.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "58 rue de Monceau",
    postalCode: "75008",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+33-7-53-56-72-58",
      contactType: "customer service",
      availableLanguage: "French",
    },
    {
      "@type": "ContactPoint",
      email: "contact@enerviaa.com",
      contactType: "customer support",
    },
  ],
  taxID: "108 274 549",
  legalName: "ENERVIA",
  foundingDate: "2026",
  areaServed: { "@type": "Country", name: "France" },
  knowsAbout: [
    "Rénovation énergétique globale",
    "Pompes à chaleur aérothermiques et géothermiques",
    "Isolation thermique par l'extérieur (ITE)",
    "Isolation des combles (NF DTU 45.10 et 45.11)",
    "MaPrimeRénov' et Certificats d'Économies d'Énergie (CEE)",
    "Audit énergétique réglementaire DPE",
    "VMC double flux",
    "Menuiseries et fenêtres à haute performance",
    "Rénovation d'ampleur Mon Accompagnateur Rénov'",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services de rénovation énergétique",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pompe à chaleur air/eau" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pompe à chaleur géothermique" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Isolation des combles perdus" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Isolation des murs par l'extérieur (ITE)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Isolation des planchers bas" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "VMC double flux" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Remplacement de fenêtres" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Audit énergétique réglementaire" } },
    ],
  },
} as const;
