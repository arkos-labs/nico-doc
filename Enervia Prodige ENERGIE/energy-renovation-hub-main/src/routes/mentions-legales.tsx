import { createFileRoute } from "@tanstack/react-router";
import {
  InformationPage,
  InformationSection,
  MissingValue,
} from "@/components/site/InformationPage";
import { BASE_URL,  publicationLabel, siteIdentity } from "@/lib/site-identity";

const title = `Mentions légales | ${siteIdentity.commercialName}`;
const description =
  "Mentions légales d'ENERVIA — SASU au capital de 1 500 €, 58 rue de Monceau, 75008 Paris.";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE_URL}/mentions-legales` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/mentions-legales` }],
  }),
  component: MentionsLegalesPage,
});

function LegalValue({ value }: { value: Parameters<typeof publicationLabel>[0] }) {
  const label = publicationLabel(value);
  return value.status === "known" ? <span>{label}</span> : <MissingValue value={label} />;
}

function MentionsLegalesPage() {
  return (
    <InformationPage
      eyebrow="Informations juridiques"
      title="Mentions légales"
      intro="Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique, nous portons à la connaissance des utilisateurs et visiteurs du site les présentes informations légales."
    >
      <InformationSection number="01" title="Éditeur du site">
        <div className="space-y-3">
          <p>
            Nom commercial : <span className="font-semibold text-[#17221c]">{siteIdentity.commercialName}</span>
          </p>
          <p>
            Forme juridique : <span className="font-semibold text-[#17221c]"><LegalValue value={siteIdentity.legalForm} /></span>
          </p>
          <p>
            Capital social : <span className="font-semibold text-[#17221c]"><LegalValue value={siteIdentity.capital} /></span>
          </p>
          <p>
            Siège social : <span className="font-semibold text-[#17221c]"><LegalValue value={siteIdentity.registeredAddress} /></span>
          </p>
          <p>
            Immatriculation R.C.S. : <span className="font-semibold text-[#17221c]"><LegalValue value={siteIdentity.registration} /></span>
          </p>
          <p>
            Directeur de la publication : <span className="font-semibold text-[#17221c]"><LegalValue value={siteIdentity.publicationDirector} /></span>
          </p>
        </div>
      </InformationSection>

      <InformationSection number="02" title="Contact">
        <div className="space-y-3">
          <p>
            Adresse électronique :{" "}
            <a
              href={`mailto:${publicationLabel(siteIdentity.contactEmail)}`}
              className="font-semibold text-[#8f552f] underline underline-offset-4 hover:text-[#6f411e] transition-colors"
            >
              <LegalValue value={siteIdentity.contactEmail} />
            </a>
          </p>
          <p>
            Téléphone : <span className="font-semibold text-[#17221c]"><LegalValue value={siteIdentity.contactPhone} /></span>
          </p>
        </div>
      </InformationSection>

      <InformationSection number="03" title="Hébergement">
        <p>
          Ce site est hébergé par : <span className="font-semibold text-[#17221c]"><LegalValue value={siteIdentity.host} /></span>
        </p>
      </InformationSection>

      <InformationSection number="04" title="Propriété intellectuelle">
        <div className="space-y-4">
          <p>
            L'ensemble du contenu de ce site (textes, images, graphismes, logotypes, icônes, sons,
            logiciels…) est la propriété exclusive de <strong>{siteIdentity.commercialName}</strong> ou de ses
            partenaires, à l'exception des éléments signalés comme appartenant à des tiers.
          </p>
          <p className="border-l-2 border-[#b9783e]/40 pl-4 text-[#5c6860] italic">
            Toute reproduction, distribution, modification, adaptation, retransmission ou publication,
            même partielle, de ces différents éléments est strictement interdite sans l'accord exprès
            par écrit de {siteIdentity.commercialName}.
          </p>
        </div>
      </InformationSection>

      <InformationSection number="05" title="Responsabilité">
        <p>
          Les informations contenues sur ce site sont aussi précises que possible et le site est
          remis à jour régulièrement. Toutefois, il peut contenir des inexactitudes, des omissions
          ou des lacunes. Si vous constatez une lacune, erreur ou ce qui paraît être un
          dysfonctionnement, merci de bien vouloir le signaler par courriel.
        </p>
        <p>
          Les estimations d'économies d'énergie et d'aides financières présentées sur ce site ont
          une vocation informative et indicative. Elles ne constituent pas un devis et ne remplacent
          pas une étude technique individuelle.
        </p>
        <p>
          {siteIdentity.commercialName} ne pourra être tenu responsable des dommages directs ou
          indirects causés au matériel de l'utilisateur, lors de l'accès au site, et résultant soit
          de l'utilisation d'un matériel ne répondant pas aux spécifications, soit de l'apparition
          d'un bug ou d'une incompatibilité.
        </p>
      </InformationSection>

      <InformationSection number="06" title="Liens hypertextes et cookies">
        <p>
          Le site peut contenir des liens hypertextes vers d'autres sites. {siteIdentity.commercialName}{" "}
          n'a pas la possibilité de vérifier le contenu des sites ainsi visités et n'assumera en
          conséquence aucune responsabilité de ce fait.
        </p>
        <p>
          La navigation sur ce site peut entraîner l'installation de cookie(s) sur l'ordinateur de
          l'utilisateur. Un cookie est un fichier de petite taille, qui ne permet pas l'identification
          de l'utilisateur, mais qui enregistre des informations relatives à la navigation d'un
          ordinateur sur un site.
        </p>
      </InformationSection>

      <p className="border-t border-[#cfc8bb] pt-8 text-xs text-[#6d756f]">
        Dernière mise à jour : {siteIdentity.lastUpdated}.
      </p>
    </InformationPage>
  );
}
