import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import {
  InformationPage,
  InformationSection,
  MissingValue,
} from "@/components/site/InformationPage";
import { BASE_URL,  publicationLabel, siteIdentity } from "@/lib/site-identity";

const title = `Politique de confidentialité | ${siteIdentity.commercialName}`;
const description =
  "État actuel et principes prévus pour la protection des données sur le site ENERVIA.";

export const Route = createFileRoute("/politique-de-confidentialite")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE_URL}/politique-de-confidentialite` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/politique-de-confidentialite` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <InformationPage
      eyebrow="Données personnelles"
      title="Politique de confidentialité"
      intro="Une présentation transparente des principes de protection des données appliqués sur le site ENERVIA."
    >

      <InformationSection number="01" title="Responsable du traitement">
        <p>
          Le responsable du traitement est : <strong>{publicationLabel(siteIdentity.dataController)}</strong>
        </p>
      </InformationSection>

      <InformationSection number="02" title="Données concernées">
        <p>
          Les informations collectées via nos formulaires incluent les coordonnées fournies par 
          l'utilisateur, les caractéristiques générales de son projet de rénovation énergétique 
          et le contenu de son message.
        </p>
      </InformationSection>

      <InformationSection number="03" title="Finalités et base légale">
        <p>
          Le traitement a pour finalité de répondre aux demandes de contact et d’étudier les 
          projets présentés. Ce traitement repose sur le consentement explicite de l'utilisateur.
        </p>
      </InformationSection>

      <InformationSection number="04" title="Destinataires et conservation">
        <p>
          Les destinataires des données sont exclusivement nos équipes internes chargées du suivi 
          des dossiers et de l'accompagnement client.
        </p>
        <p>
          Durée de conservation : {publicationLabel(siteIdentity.retentionPeriod)}.
        </p>
      </InformationSection>

      <InformationSection number="05" title="Sécurité et hébergement">
        <p>
          Nous appliquons des mesures de sécurité strictes, incluant la validation des données 
          côté serveur et des connexions chiffrées (HTTPS), pour protéger vos informations contre 
          tout accès non autorisé.
        </p>
      </InformationSection>

      <InformationSection number="06" title="Vos droits">
        <p>
          Vous pouvez exercer vos droits d’accès, de rectification, d’effacement, de limitation et 
          d’opposition relatifs à vos données personnelles.
        </p>
        <p>
          Canal d’exercice des droits : <strong>{publicationLabel(siteIdentity.rightsContact)}</strong>.
        </p>
        <p>
          Toute personne estimant que ses droits ne sont pas respectés peut adresser une réclamation 
          à la CNIL.
        </p>
      </InformationSection>

      <InformationSection number="07" title="Contact et évolution de cette politique">
        <p>
          La page{" "}
          <Link to="/contact" className="font-semibold text-[#8f552f] underline underline-offset-4 hover:text-[#6f411e]">
            Contact
          </Link>{" "}
          vous permet de nous joindre pour toute question relative à cette politique de confidentialité.
        </p>
        <p>Dernière mise à jour : {siteIdentity.lastUpdated}.</p>
      </InformationSection>
    </InformationPage>
  );
}
