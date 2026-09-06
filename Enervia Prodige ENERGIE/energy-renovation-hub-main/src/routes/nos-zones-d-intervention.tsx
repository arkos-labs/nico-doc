import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { PageShell } from "@/components/site/Layout";
import { ArrowRight, MapPin, Phone } from "lucide-react";

const title = "Zones d'intervention ENERVIA — Rénovation énergétique partout en France";
const description =
  "ENERVIA intervient dans toute la France pour vos travaux de rénovation énergétique : pompe à chaleur, isolation, VMC, fenêtres. Contactez-nous depuis n'importe quelle région.";

export const Route = createFileRoute("/nos-zones-d-intervention")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE_URL}/nos-zones-d-intervention` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/nos-zones-d-intervention` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
            {
              "@type": "ListItem",
              position: 2,
              name: "Zones d'intervention",
              item: `${BASE_URL}/nos-zones-d-intervention`,
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Rénovation énergétique globale",
          provider: {
            "@type": "Organization",
            name: "ENERVIA",
            url: BASE_URL,
          },
          areaServed: [
            { "@type": "Country", name: "France" },
            { "@type": "AdministrativeArea", name: "Île-de-France" },
            { "@type": "AdministrativeArea", name: "Auvergne-Rhône-Alpes" },
            { "@type": "AdministrativeArea", name: "Nouvelle-Aquitaine" },
            { "@type": "AdministrativeArea", name: "Occitanie" },
            { "@type": "AdministrativeArea", name: "Hauts-de-France" },
            { "@type": "AdministrativeArea", name: "Grand Est" },
            { "@type": "AdministrativeArea", name: "Provence-Alpes-Côte d'Azur" },
            { "@type": "AdministrativeArea", name: "Pays de la Loire" },
            { "@type": "AdministrativeArea", name: "Bretagne" },
            { "@type": "AdministrativeArea", name: "Normandie" },
            { "@type": "AdministrativeArea", name: "Bourgogne-Franche-Comté" },
            { "@type": "AdministrativeArea", name: "Centre-Val de Loire" },
            { "@type": "AdministrativeArea", name: "Corse" },
          ],
          description:
            "Travaux de rénovation énergétique : pompe à chaleur, isolation thermique, VMC double flux, menuiseries. Accompagnement MaPrimeRénov' dans toute la France métropolitaine.",
        }),
      },
    ],
  }),
  component: ZonesInterventionPage,
});

type Region = {
  name: string;
  slug: string;
  depts: string;
  cities: string[];
  highlight: string;
};

const REGIONS: Region[] = [
  {
    name: "Île-de-France",
    slug: "ile-de-france",
    depts: "75, 77, 78, 91, 92, 93, 94, 95",
    cities: ["Paris", "Versailles", "Boulogne-Billancourt", "Saint-Denis", "Argenteuil", "Montreuil"],
    highlight: "Forte densité de logements collectifs et copropriétés — expertise renovation d'immeuble.",
  },
  {
    name: "Auvergne-Rhône-Alpes",
    slug: "auvergne-rhone-alpes",
    depts: "01, 03, 07, 15, 26, 38, 42, 43, 63, 69, 73, 74",
    cities: ["Lyon", "Grenoble", "Clermont-Ferrand", "Annecy", "Chambéry", "Saint-Étienne", "Valence"],
    highlight: "Climat continental et montagnard — isolation et pompe à chaleur fortement recommandés.",
  },
  {
    name: "Nouvelle-Aquitaine",
    slug: "nouvelle-aquitaine",
    depts: "16, 17, 19, 23, 24, 33, 40, 47, 64, 79, 86, 87",
    cities: ["Bordeaux", "Limoges", "Poitiers", "Pau", "La Rochelle", "Bayonne", "Périgueux"],
    highlight: "Vaste région avec un parc de maisons individuelles idéal pour les PAC air/eau.",
  },
  {
    name: "Occitanie",
    slug: "occitanie",
    depts: "09, 11, 12, 30, 31, 32, 34, 46, 48, 65, 66, 81, 82",
    cities: ["Toulouse", "Montpellier", "Nîmes", "Perpignan", "Narbonne", "Albi", "Tarbes"],
    highlight: "Ensoleillement élevé — solutions de climatisation réversible et PAC air/air très demandées.",
  },
  {
    name: "Hauts-de-France",
    slug: "hauts-de-france",
    depts: "02, 59, 60, 62, 80",
    cities: ["Lille", "Amiens", "Calais", "Dunkerque", "Valenciennes", "Roubaix", "Tourcoing"],
    highlight: "Région aux hivers rigoureux — isolation des combles et pompes à chaleur prioritaires.",
  },
  {
    name: "Grand Est",
    slug: "grand-est",
    depts: "08, 10, 51, 52, 54, 55, 57, 67, 68, 88",
    cities: ["Strasbourg", "Reims", "Metz", "Nancy", "Mulhouse", "Colmar", "Charleville-Mézières"],
    highlight: "Fortes amplitudes thermiques — rénovation d'ampleur et audit énergétique très sollicités.",
  },
  {
    name: "Provence-Alpes-Côte d'Azur",
    slug: "provence-alpes-cote-d-azur",
    depts: "04, 05, 06, 13, 83, 84",
    cities: ["Marseille", "Nice", "Toulon", "Aix-en-Provence", "Avignon", "Cannes", "Antibes"],
    highlight: "Chaleur estivale importante — VMC, isolation ITE et PAC réversibles en forte demande.",
  },
  {
    name: "Pays de la Loire",
    slug: "pays-de-la-loire",
    depts: "44, 49, 53, 72, 85",
    cities: ["Nantes", "Angers", "Le Mans", "Saint-Nazaire", "La Roche-sur-Yon", "Laval"],
    highlight: "Région dynamique avec un fort parc de maisons individuelles rénovables.",
  },
  {
    name: "Bretagne",
    slug: "bretagne",
    depts: "22, 29, 35, 56",
    cities: ["Rennes", "Brest", "Quimper", "Lorient", "Vannes", "Saint-Malo", "Saint-Brieuc"],
    highlight: "Humidité et vents côtiers — étanchéité à l'air et VMC double flux essentiels.",
  },
  {
    name: "Normandie",
    slug: "normandie",
    depts: "14, 27, 50, 61, 76",
    cities: ["Rouen", "Caen", "Le Havre", "Cherbourg", "Évreux", "Alençon"],
    highlight: "Parc ancien avec de grands besoins en isolation et remplacement de fenêtres.",
  },
  {
    name: "Bourgogne-Franche-Comté",
    slug: "bourgogne-franche-comte",
    depts: "21, 25, 39, 58, 70, 71, 89, 90",
    cities: ["Dijon", "Besançon", "Belfort", "Chalon-sur-Saône", "Mâcon", "Auxerre"],
    highlight: "Hiver continental marqué — isolation des planchers et pompes à chaleur géothermiques adaptées.",
  },
  {
    name: "Centre-Val de Loire",
    slug: "centre-val-de-loire",
    depts: "18, 28, 36, 37, 41, 45",
    cities: ["Orléans", "Tours", "Bourges", "Chartres", "Blois", "Châteauroux"],
    highlight: "Nombreuses maisons de plain-pied — isolation des planchers et PAC air/eau recommandées.",
  },
  {
    name: "Corse",
    slug: "corse",
    depts: "2A, 2B",
    cities: ["Ajaccio", "Bastia", "Porto-Vecchio", "Corte", "Calvi"],
    highlight: "Île au climat méditerranéen — solutions de climatisation réversible et isolation très demandées.",
  },
];

function ZonesInterventionPage() {
  return (
    <PageShell>
      <article>
        {/* Hero */}
        <header className="bg-[#111814] text-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d9a66e]">
              Couverture nationale
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white">
              ENERVIA intervient dans toute la France pour votre rénovation énergétique.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              Pompe à chaleur, isolation, VMC, menuiseries, audit énergétique — nous coordonnons vos
              travaux partout en France métropolitaine et accompagnons chaque dossier MaPrimeRénov'.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex min-h-14 items-center gap-3 bg-[#b9783e] px-6 text-sm font-bold transition-colors hover:bg-[#c9894e]"
              >
                Nous contacter
                <ArrowRight className="size-4" aria-hidden />
              </a>
              <a
                href="/#simulateur"
                className="inline-flex min-h-14 items-center gap-3 border border-white/30 px-6 text-sm font-semibold hover:border-white/60 hover:bg-white/5"
              >
                Estimer mon projet
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          </div>
        </header>

        {/* Chiffres clés */}
        <section className="bg-[#f4f1ea] border-b border-[#d6d0c5]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-[#d6d0c5] px-0 sm:grid-cols-4 lg:grid-cols-4">
            {[
              { value: "13", label: "régions couvertes" },
              { value: "96", label: "départements" },
              { value: "100 %", label: "France métropolitaine" },
              { value: "1 contact", label: "pour toute la France" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#f4f1ea] px-8 py-10">
                <p className="font-display text-4xl font-medium tracking-[-0.04em] text-[#b9783e]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-[#667169]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Grille des régions */}
        <section className="bg-[#f4f1ea] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="mb-12">
              <p className="premium-eyebrow">Régions d'intervention</p>
              <h2 className="mt-3 font-display text-3xl font-medium tracking-[-0.04em] text-[#17221c] sm:text-4xl">
                Toutes les régions de France métropolitaine
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5e6b63]">
                Notre équipe se déplace dans les 13 régions et coordonne les artisans RGE locaux
                pour assurer la qualité et l'éligibilité de vos travaux aux aides de l'État.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {REGIONS.map((region) => (
                <article
                  key={region.slug}
                  className="border border-[#d6d0c5] bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-[#b9783e]" aria-hidden />
                    <div>
                      <h3 className="font-display text-lg font-medium text-[#17221c]">
                        {region.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-[#8a948e]">Dép. {region.depts}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-6 text-[#5e6b63] italic">{region.highlight}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {region.cities.map((city) => (
                      <span
                        key={city}
                        className="border border-[#d6d0c5] bg-[#f4f1ea] px-2.5 py-0.5 text-[11px] font-medium text-[#35433b]"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="border-t border-[#d6d0c5] bg-[#e8e3d8] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <p className="premium-eyebrow">Notre fonctionnement</p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-[-0.04em] text-[#17221c] sm:text-4xl">
              Un seul interlocuteur, où que vous soyez.
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {[
                {
                  num: "01",
                  title: "Vous nous contactez",
                  body: "Par téléphone ou via le formulaire. Nous échangeons sur votre projet, votre logement et vos objectifs.",
                },
                {
                  num: "02",
                  title: "Nous coordonnons localement",
                  body: "ENERVIA sélectionne et coordonne les artisans RGE qualifiés dans votre département pour réaliser les travaux.",
                },
                {
                  num: "03",
                  title: "Nous gérons vos aides",
                  body: "Nous constituons votre dossier MaPrimeRénov', CEE et Éco-PTZ et suivons l'avancement jusqu'au versement.",
                },
              ].map((step) => (
                <div key={step.num} className="border-t-2 border-[#b9783e] pt-6">
                  <span className="font-display text-4xl font-medium text-[#b9783e]">{step.num}</span>
                  <h3 className="mt-4 font-display text-xl font-medium text-[#17221c]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5e6b63]">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-[#f4f1ea] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-10 bg-[#17231d] p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:p-16">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d9a66e]">
                Partout en France
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl">
                Votre projet mérite un accompagnement sur mesure.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
                Quel que soit votre département, nos experts évaluent votre logement et construisent
                le plan de rénovation le plus rentable, avec toutes les aides disponibles.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <a
                href="/contact"
                className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#b9783e] px-6 text-sm font-bold hover:bg-[#c9894e]"
              >
                Demander un devis
                <ArrowRight className="size-4" aria-hidden />
              </a>
              <a
                href="tel:+33753567258"
                className="inline-flex min-h-14 items-center justify-center gap-3 border border-white/30 px-6 text-sm font-semibold hover:border-white/60 hover:bg-white/5"
              >
                <Phone className="size-4" aria-hidden />
                07 53 56 72 58
              </a>
            </div>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
