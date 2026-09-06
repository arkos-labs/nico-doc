import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { SiloPage } from "@/components/site/SiloPage";

const title = "MaPrimeRénov' 2026 : barèmes, travaux éligibles et démarches";
const description =
  "MaPrimeRénov' 2026 : barèmes officiels Anah au 1er janvier 2026, travaux éligibles, montants par geste, taux rénovation d'ampleur et démarches complètes.";

export const Route = createFileRoute("/maprimerenov")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/maprimerenov` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/maprimerenov` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Quels sont les plafonds de revenus pour MaPrimeRénov' 2026 ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Au 1er janvier 2026, les plafonds de Revenu Fiscal de Référence pour un ménage de 2 personnes sont : très modestes 35 270 € (IDF) / 25 393 € (hors IDF) ; modestes 42 933 € (IDF) / 32 553 € (hors IDF) ; intermédiaires 60 051 € (IDF) / 45 842 € (hors IDF). Au-delà, le ménage est en catégorie revenus supérieurs.",
              },
            },
            {
              "@type": "Question",
              name: "Quel est le montant de MaPrimeRénov' pour une pompe à chaleur air/eau en 2026 ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Le forfait MaPrimeRénov' pour une pompe à chaleur air/eau (dont PAC hybrides) est de 5 000 € pour les ménages très modestes, 4 000 € pour les ménages modestes, 3 000 € pour les ménages intermédiaires, et non éligible pour les ménages aux revenus supérieurs. Le plafond de dépenses éligibles est de 12 000 €. Source : barème Anah au 1er janvier 2026.",
              },
            },
            {
              "@type": "Question",
              name: "Quelle est la différence entre MaPrimeRénov' par geste et rénovation d'ampleur ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Le parcours par geste finance des travaux isolés (PAC, isolation combles, VMC…) sans obligation d'améliorer globalement le logement. Le parcours accompagné (rénovation d'ampleur) finance un projet global visant a minima 2 classes DPE de gain, avec un MonAccompagnateurRénov' obligatoire, mais avec des taux d'aide bien supérieurs : jusqu'à 80 % pour les ménages très modestes sur un plafond de 30 000 € HT (gain 2 classes) ou 40 000 € HT (gain 3 classes ou plus).",
              },
            },
            {
              "@type": "Question",
              name: "Faut-il déposer le dossier MaPrimeRénov' avant ou après les travaux ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Le dossier MaPrimeRénov' doit impérativement être déposé et l'accord de principe obtenu AVANT toute signature de devis ou versement d'acompte. Toute dépense engagée avant l'accord entraîne la perte de l'éligibilité. La demande se fait en ligne sur maprimerenov.gouv.fr.",
              },
            },
            {
              "@type": "Question",
              name: "L'isolation des murs (ITE) est-elle encore éligible à MaPrimeRénov' en 2026 ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Non, l'isolation thermique par l'extérieur (ITE) et les chaudières biomasse sont exclues du parcours par geste depuis le 1er janvier 2026. L'ITE reste finançable dans le cadre du parcours accompagné (rénovation d'ampleur) et via les Certificats d'Économies d'Énergie (CEE).",
              },
            },
            {
              "@type": "Question",
              name: "Quel est le montant de MaPrimeRénov' pour l'isolation des combles en 2026 ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Le forfait MaPrimeRénov' pour l'isolation des rampants de toiture ou plafonds de combles est de 25 €/m² pour les ménages très modestes, 20 €/m² pour les ménages modestes, 15 €/m² pour les ménages intermédiaires, et non éligible pour les revenus supérieurs. Le plafond de dépenses éligibles est de 75 €/m². Source : barème Anah au 1er janvier 2026.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="maprimerenov"
      eyebrow="Aides financières"
      h1="MaPrimeRénov' 2026 : montants, travaux éligibles et démarches."
      intro="MaPrimeRénov' est l'aide principale de l'État pour la rénovation énergétique, pilotée par l'Anah (budget 3,6 milliards € en 2026). Elle finance les travaux selon vos revenus, via deux parcours : par geste (travaux isolés) ou accompagné (rénovation globale). Barèmes officiels au 1er janvier 2026."
      highlights={[
        {
          value: "80 %",
          label:
            "Taux maximal pour les ménages très modestes en rénovation d'ampleur (plafond 30 000 € HT)",
        },
        {
          value: "5 000 €",
          label:
            "Forfait PAC air/eau pour les ménages très modestes (par geste, plafond dépenses 12 000 €)",
        },
        {
          value: "Avant",
          label:
            "Le dossier doit être déposé avant toute signature de devis ou versement d'acompte",
        },
      ]}
      sections={[
        {
          heading: "01. Les deux parcours MaPrimeRénov'",
          body: "MaPrimeRénov' fonctionne selon deux logiques complémentaires. Le parcours par geste finance des travaux unitaires sans obligation de résultat global : seuls les ménages très modestes, modestes et intermédiaires y sont éligibles. Le parcours accompagné (rénovation d'ampleur) est ouvert à tous les revenus, exige un gain d'au moins 2 classes DPE et rend obligatoire un MonAccompagnateurRénov' (MAR) — mais les taux d'aide sont nettement supérieurs.",
          bullets: [
            "Par geste : PAC, isolation combles, VMC, menuiseries — selon revenus, sans MAR requis",
            "Rénovation d'ampleur : gain ≥ 2 classes DPE, atteinte d'au moins la classe E, MAR obligatoire",
            "Depuis le 1er janvier 2026 : l'ITE et les chaudières biomasse sont exclues du parcours par geste",
            "Depuis 2026 : un rendez-vous France Rénov' préalable est obligatoire pour le parcours accompagné",
          ],
          callout:
            "Le parcours accompagné offre des taux jusqu'à 8× supérieurs au parcours par geste pour les ménages très modestes. Si votre projet implique plusieurs travaux, il est souvent plus rentable de coordonner en rénovation d'ampleur.",
          image: {
            src: "/maprimerenov.png",
            alt: "Logo officiel MaPrimeRénov' — aide de l'État pilotée par l'Anah pour la rénovation énergétique",
          },
        },
        {
          heading: "02. Plafonds de revenus 2026 — les 4 catégories",
          body: "Le montant de MaPrimeRénov' dépend du Revenu Fiscal de Référence (RFR) du foyer (avis d'imposition N-2). L'Anah distingue deux zones : Île-de-France et hors Île-de-France. Voici les plafonds au 1er janvier 2026 pour les situations les plus fréquentes :",
          bullets: [
            "Ménage 1 personne — Très modestes : 24 031 € (IDF) / 17 363 € (hors IDF)",
            "Ménage 1 personne — Modestes : 29 253 € (IDF) / 22 259 € (hors IDF)",
            "Ménage 1 personne — Intermédiaires : 40 851 € (IDF) / 31 185 € (hors IDF)",
            "Ménage 2 personnes — Très modestes : 35 270 € (IDF) / 25 393 € (hors IDF)",
            "Ménage 2 personnes — Modestes : 42 933 € (IDF) / 32 553 € (hors IDF)",
            "Ménage 2 personnes — Intermédiaires : 60 051 € (IDF) / 45 842 € (hors IDF)",
            "Ménage 3 personnes — Très modestes : 42 357 € (IDF) / 30 540 € (hors IDF)",
            "Ménage 3 personnes — Modestes : 51 564 € (IDF) / 39 148 € (hors IDF)",
            "Ménage 3 personnes — Intermédiaires : 71 846 € (IDF) / 55 196 € (hors IDF)",
            "Par personne supplémentaire — Très modestes : +7 116 € (IDF) / +5 151 € (hors IDF)",
            "Par personne supplémentaire — Modestes : +8 663 € (IDF) / +6 598 € (hors IDF)",
          ],
          callout:
            "Au-delà des plafonds intermédiaires, le ménage est classé « revenus supérieurs » : éligible uniquement au parcours accompagné à 10 % sur un plafond de 30 000 € HT (gain 2 classes) ou 40 000 € HT (gain 3 classes). Source : barème Anah au 1er janvier 2026.",
        },
        {
          heading: "03. Forfaits par geste — chauffage et eau chaude sanitaire",
          body: "Montants des forfaits MaPrimeRénov' pour les travaux de chauffage et d'eau chaude sanitaire, par catégorie de revenus, au 1er janvier 2026. Les ménages aux revenus supérieurs ne sont pas éligibles au parcours par geste.",
          bullets: [
            "PAC air/eau (dont hybrides) : 5 000 € / 4 000 € / 3 000 € — plafond dépenses 12 000 €",
            "PAC géothermique ou solarothermique : 11 000 € / 9 000 € / 6 000 € — plafond 18 000 €",
            "Chauffe-eau thermodynamique : 1 200 € / 800 € / 400 € — plafond 3 500 €",
            "Chauffe-eau solaire individuel : 4 000 € / 3 000 € / 2 000 € — plafond 7 000 €",
            "Chauffage solaire combiné : 10 000 € / 8 000 € / 4 000 € — plafond 16 000 €",
            "Raccordement réseau de chaleur/froid : 1 200 € / 800 € / 400 € — plafond 1 800 €",
            "Poêle à granulés / cuisinière à granulés : 1 250 € / 1 000 € / 750 € — plafond 5 000 €",
            "Poêle à bûches / foyer fermé : 1 250 € / 750 € / 500 € — plafond 4 000 €",
            "Dépose de cuve à fioul : 1 200 € / 800 € / 400 € — plafond 4 000 €",
          ],
          callout:
            "Les ménages très modestes peuvent bénéficier d'une avance allant jusqu'à 50 % du montant de la prime avant le début des travaux, sous réserve de fournir un devis signé.",
        },
        {
          heading: "04. Forfaits par geste — isolation thermique et VMC",
          body: "Montants des forfaits MaPrimeRénov' pour les travaux d'isolation et de ventilation, par catégorie de revenus, au 1er janvier 2026. L'ITE (isolation des murs par l'extérieur) n'est plus éligible au parcours par geste depuis le 1er janvier 2026.",
          bullets: [
            "Isolation rampants toiture / plafonds combles : 25 €/m² / 20 €/m² / 15 €/m² — plafond 75 €/m²",
            "Isolation toitures-terrasses : 75 €/m² / 60 €/m² / 40 €/m² — plafond 180 €/m²",
            "Isolation parois vitrées (fenêtres, portes-fenêtres) : 100 € / 80 € / 40 € par équipement — plafond 1 000 €",
            "VMC double flux (conditionnée à un geste d'isolation thermique) : 2 500 € / 2 000 € / 1 500 € — plafond 6 000 €",
            "Audit énergétique hors obligation réglementaire : 500 € / 400 € / 300 € — plafond 800 €",
          ],
          callout:
            "Le taux d'écrêtement limite le cumul MaPrimeRénov' + CEE à 90 % de la dépense TTC pour les très modestes, 75 % pour les modestes, 60 % pour les intermédiaires. En ajoutant des aides locales, le plafond monte à 100 % pour tous.",
        },
        {
          heading: "05. Rénovation d'ampleur — taux et plafonds de dépenses",
          body: "Le parcours accompagné (rénovation d'ampleur) finance un projet global permettant a minima un gain de 2 classes énergétiques sur le DPE, après audit énergétique réglementaire. Le logement doit être classé E, F ou G avant travaux. Les taux s'appliquent sur les dépenses HT éligibles.",
          bullets: [
            "Gain de 2 classes DPE — Plafond de dépenses : 30 000 € HT",
            "Gain de 3 classes DPE ou plus — Plafond de dépenses : 40 000 € HT",
            "Ménages très modestes : 80 % du montant HT des travaux éligibles",
            "Ménages modestes : 60 % du montant HT des travaux éligibles",
            "Ménages intermédiaires : 45 % du montant HT des travaux éligibles",
            "Ménages supérieurs : 10 % du montant HT des travaux éligibles",
            "Écrêtement (cumul toutes aides) : 100 % / 90 % / 80 % / 50 % du montant TTC",
            "Avance possible jusqu'à 30 % de l'aide pour les propriétaires occupants très modestes et modestes",
          ],
          callout:
            "Le MAR (Mon Accompagnateur Rénov') est obligatoire pour ce parcours. Sa prise en charge atteint 100 % pour les très modestes, 80 % pour les modestes, 40 % pour les intermédiaires et 20 % pour les supérieurs, dans la limite de 2 000 € TTC.",
        },
        {
          heading: "06. Travaux éligibles en 2026 — parcours par geste",
          body: "La liste des équipements éligibles au parcours par geste est arrêtée par décret. Depuis le 1er janvier 2026, deux catégories ont été supprimées. Tous les travaux doivent être réalisés par un artisan certifié RGE.",
          bullets: [
            "✅ PAC air/eau, PAC géothermique ou solarothermique, PAC hybrides",
            "✅ Isolation combles (rampants, plafonds), toitures-terrasses",
            "✅ Parois vitrées (fenêtres et portes-fenêtres) en remplacement de simple vitrage",
            "✅ VMC double flux (conditionnée à un geste d'isolation thermique concomitant)",
            "✅ Chauffe-eau thermodynamique, solaire individuel, chauffage solaire combiné",
            "✅ Poêles à bûches ou granulés, foyers fermés et inserts",
            "✅ Raccordement à un réseau de chaleur ou de froid",
            "❌ ITE (isolation murs par l'extérieur) — exclue depuis le 1er janvier 2026",
            "❌ Chaudières biomasse — exclues depuis le 1er janvier 2026",
          ],
          callout:
            "Exception urgence : en cas de panne de chauffage (1er octobre–30 avril) ou de panne de chauffe-eau (toute l'année), il est possible de commencer les travaux avant de déposer le dossier, sous réserve de le soumettre dans les 2 mois.",
        },
        {
          heading: "07. Démarches et ordre à respecter",
          body: "L'ordre des étapes est strict et conditionne l'éligibilité. Toute dépense engagée avant l'accord de principe entraîne la perte définitive de l'aide. Depuis 2026, la vérification d'identité est renforcée (France Connect+ ou code courrier).",
          bullets: [
            "Étape 1 (parcours accompagné uniquement) : rendez-vous conseiller France Rénov' — obligatoire avant le dépôt du dossier",
            "Étape 2 (parcours accompagné) : audit énergétique réglementaire définissant le scénario de travaux",
            "Étape 3 : création du compte sur maprimerenov.gouv.fr et dépôt du dossier avec les pièces obligatoires",
            "Étape 4 : obtention de l'accord de l'Anah — attendre cet accord avant tout devis signé",
            "Étape 5 : signature du devis et réalisation des travaux par un artisan RGE",
            "Étape 6 : dépôt des factures en ligne et demande de versement de la prime",
          ],
          callout:
            "Un mandataire (artisan, CEE, mandataire agréé) peut vous aider dans les démarches administratives. Attention : le compte MaPrimeRénov' doit être créé uniquement par le particulier lui-même — le mandataire ne peut pas créer le compte à votre place.",
        },
        {
          heading: "08. Cumul avec d'autres aides",
          body: "MaPrimeRénov' est cumulable avec plusieurs autres dispositifs dans le respect des règles d'écrêtement imposées par l'Anah. En rénovation d'ampleur, MaPrimeRénov' n'est pas cumulable avec les CEE (certificats d'économies d'énergie) mais reste cumulable avec les aides des collectivités locales.",
          bullets: [
            "CEE (par geste uniquement) : cumulables avec écrêtement — cumul plafonné à 90 %/75 %/60 % selon revenus",
            "Éco-PTZ MaPrimeRénov' : prêt sans intérêts jusqu'à 50 000 € pour financer le reste à charge",
            "TVA à 5,5 % sur la fourniture et la pose des travaux d'isolation, chauffage et ventilation éligibles",
            "Aides des collectivités locales (régions, départements, EPCI) : cumulables avec écrêtement",
            "Aides des caisses de retraite : cumulables selon les dispositifs",
          ],
          callout:
            "Un conseiller France Rénov' peut établir un plan de financement complet en croisant toutes les aides disponibles pour votre situation. Ce service est gratuit et sans engagement sur france-renov.gouv.fr.",
        },
      ]}
      faqs={[
        {
          question: "Quels sont les plafonds de revenus pour MaPrimeRénov' 2026 ?",
          answer:
            "Au 1er janvier 2026, les plafonds de Revenu Fiscal de Référence pour un ménage de 2 personnes sont : très modestes 35 270 € (IDF) / 25 393 € (hors IDF) ; modestes 42 933 € (IDF) / 32 553 € (hors IDF) ; intermédiaires 60 051 € (IDF) / 45 842 € (hors IDF). Au-delà, le ménage est classé revenus supérieurs. Source : barème Anah au 1er janvier 2026.",
        },
        {
          question: "Quel est le montant de MaPrimeRénov' pour une pompe à chaleur air/eau en 2026 ?",
          answer:
            "Le forfait MaPrimeRénov' pour une PAC air/eau est de 5 000 € pour les très modestes, 4 000 € pour les modestes, 3 000 € pour les intermédiaires, et non éligible pour les revenus supérieurs. Le plafond de dépenses éligibles est de 12 000 €. Source : barème Anah au 1er janvier 2026.",
        },
        {
          question: "Quel est le montant de MaPrimeRénov' pour l'isolation des combles en 2026 ?",
          answer:
            "Le forfait pour les rampants de toiture ou plafonds de combles est de 25 €/m² pour les très modestes, 20 €/m² pour les modestes, 15 €/m² pour les intermédiaires. Le plafond de dépenses éligibles est de 75 €/m². Source : barème Anah au 1er janvier 2026.",
        },
        {
          question: "Quelle est la différence entre MaPrimeRénov' par geste et rénovation d'ampleur ?",
          answer:
            "Le parcours par geste finance des travaux isolés (PAC, isolation combles, VMC…) réservé aux ménages très modestes, modestes et intermédiaires. Le parcours accompagné finance un projet global visant ≥ 2 classes DPE de gain, ouvert à tous les revenus, avec des taux allant de 10 % (supérieurs) à 80 % (très modestes) sur un plafond de 30 000 € HT (gain 2 classes) ou 40 000 € HT (gain 3 classes ou plus).",
        },
        {
          question: "Faut-il déposer le dossier MaPrimeRénov' avant ou après les travaux ?",
          answer:
            "Le dossier doit impérativement être déposé et l'accord obtenu AVANT toute signature de devis ou versement d'acompte. Toute dépense engagée avant l'accord entraîne la perte de l'éligibilité. Exception : en cas de panne urgente de chauffage (1er oct.–30 avr.) ou de chauffe-eau (toute l'année), vous disposez de 2 mois après l'installation pour déposer le dossier.",
        },
        {
          question: "L'isolation des murs (ITE) est-elle encore éligible à MaPrimeRénov' en 2026 ?",
          answer:
            "Non, l'ITE et les chaudières biomasse sont exclues du parcours par geste depuis le 1er janvier 2026. L'ITE reste finançable dans le cadre du parcours accompagné (rénovation d'ampleur) et via les CEE.",
        },
      ]}
    />
  ),
});
