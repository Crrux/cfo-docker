import Collapsible from "../../components/Collapsible/Collapsible";
import TitleBackgroundImage from "/assets/title_background/TitleBackground_Seances.webp";

function Class() {
  return (
    <main id="class">
      <section className="main__header">
        <div className="title_container">
          <img src={TitleBackgroundImage} alt="Background" />
          <p>Découvrez</p>
          <h1>Nos séances</h1>
        </div>
      </section>
      <section className="collapsible_container">
        <div className="collapsible_container__column">
          <Collapsible
            index={1}
            titre={"LE WOD"}
          >
            <p>Le WOD est l&apos;acronyme de Workout of The Day. Chaque jour, une
              nouvelle séance où le but est de t&apos;amener à travailler
              l&apos;ensemble des qualités physiques au travers de 3 disciplines
              principales :</p>
            <ul>
              <li>le Cardio</li>
              <li>La Gymnastique</li>
              <li>L&apos;haltérophilie</li>
            </ul>
          </Collapsible>
          <Collapsible
            index={2}
            titre={"FUNCTIONAL BODY BUILDING"}
          >
            <p>Notre séance de renforcement global,
              alliant exercices au poids de corps et à charges externes. Ses
              bienfaits sont la prévention de blessure, la réathlétisation et le
              développement de la masse musculaire.</p>
          </Collapsible>
          <Collapsible
            index={3}
            titre={"GYMNASTIQUE"}
          >
            <p>La gym&apos; pratiquée en CrossFit regroupe tous les
              mouvements au poids de corps; tractions, pompes, montées de cordes,
              marche sur les mains et bien d&apos;autres… Ce cours favorise le
              développement de l&apos;équilibre, l&apos;agilité, la coordination et
              la précision. Il est destiné à l&apos;apprentissage technique des
              mouvements les plus simples aux plus complexes.</p>
          </Collapsible>
        </div>
        <div className="collapsible_container__column">
          <Collapsible
            index={4}
            titre={"WEIGHTLIFTING"}
          >
            <p>Weightlifting est une discipline olympique composée de deux mouvements
              principaux : le snatch (arraché) et le clean & jerk (épaulé-jeté).
              Elle favorise le développement de la force, la vitesse,
              l&apos;explosivité, l&apos;agilité et la coordination. Un cours pour
              apprendre ou se perfectionner, accompagné de renforcement musculaire
              ciblé.</p>
          </Collapsible>
          <Collapsible
            index={5}
            titre={"HYROX"}
          >
            <p>HYROX est un cours mélangeant la course à pied à des
              exercices fonctionnels; vous y retrouverez la pratique du rameur, des
              wall ball shots, des fentes marchées, de la poussée et du tirage de
              sled, du ski-erg, du farmer carry et d&apos;autres petites choses
              venant pimenter cet entraînement à visée d&apos;endurance
              cardiovasculaire et musculaire ciblée sur les membres inférieurs.</p>
          </Collapsible>
          <Collapsible
            index={6}
            titre={"CROSSFIT KIDS / TEENS"}
          >
            <p>CrossFit Kids / Teens est destiné aux enfants de 7 à 11 et de 12 à 17
              ans respectivement. C&apos;est une façon ludique et amusante de faire
              de l&apos;exercice pour vos enfants. Porter une charge avec une bonne
              posture, grimper, sauter, ramper, tirer, pousser, lancer, etc… En plus
              de développer l&apos;ensemble des qualités physiques chez nos jeunes,
              il favorise, entre autres, la concentration, l&apos;écoute, la
              confiance en soi, l&apos;entraide, la bienveillance et la
              détermination.</p>
          </Collapsible>
        </div>
        <div className="collapsible_container__column">
          <Collapsible
            index={7}
            titre={"PARENTS-ENFANTS"}
          >
            <p>
              Nous avons créé ce cours pour vous donner
              l&apos;opportunité de partager un moment convivial et sportif en duo
              avec votre enfant. Son but est de renforcer vos liens dans un
              environnement positif et de se dépasser en famille. Ensemble, vous
              prenez soin de votre santé et nourrissez une complicité durable. À
              partir de 11 ans !
            </p>
          </Collapsible>
          <Collapsible
            index={8}
            titre={"SENIORS"}
          >
            <p>
              Une pratique douce du cardio, de la souplesse et du
              renforcement musculaire pour repousser les effets indésirables de
              l&apos;âge et conserver une santé de fer. En petits groupes, au
              travers de mouvements fonctionnels, dans une ambiance bienveillante et
              chaleureuse. À partir de 65 ans !
            </p>
          </Collapsible>
          <Collapsible
            index={9}
            titre={"LE WOD TEAM"}
          >
            <p>
              Le WoD Team est un rendez-vous à ne pas manquer ! Vous embarquez pour
              une aventure sportive à plusieurs, au travers d&apos;exercices
              requérants la mise en place de stratégies de groupe en adéquation avec
              les points forts et les appétences de chacun ! Vous y retrouverez des
              mouvements en synchro&apos;, des relais et plein d&apos;autres choses
              venant stimuler votre esprit d&apos;équipe !
            </p>
          </Collapsible>
        </div>
      </section>

      <p>
        Souplesse, mobilité, coordination, renforcement musculaire et bien
        d&apos;autres activités t&apos;attendent dans ces cours riches et variés
        où chaque jour est une surprise et ne se ressemble pas.
      </p>
    </main>
  );
}

export default Class;
