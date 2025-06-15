import Popup from "../../components/popup/popup";
import TitleBackgroundImage from "/assets/title_background/TitleBackground_Evenements.webp";

function Events() {
  return (
    <main className="event_main">
      <div className="main__header">
        <div className="title_container">
          <img src={TitleBackgroundImage} alt="Background" />
          <p>Toute l&apos;année</p>
          <h1>Les événements</h1>
        </div>
      </div>

      <p>
        Toute l&apos;année, nos événements viennent dynamiser la vie de la box.
        À quoi vous attendre ?
      </p>
      <ul>
        <li>
          Des repas et barbecues pour les fêtes et parfois sans raison
          particulière
        </li>
        <li>
          Une compétition par équipe ouverte à tous, les &quot;
          <a
            style={{ textDecoration: "none" }}
            href="https://www.instagram.com/heroesteamcontest/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Heroes Team Contest
          </a>
          &quot; pour vous challenger auprès de concurrents venus des quatre
          coins de la France !
        </li>
        <li>
          Une compétition interne par équipe, pour profiter d&apos;un événement
          fun avec vos meilleurs teammates de la box !
        </li>
        <li>
          Des weekends sportifs à la box ou ailleurs, des randonnées, marchés de
          noël et bien d&apos;autres choses organisées par nos équipes !
        </li>
      </ul>
    </main>
  );
}

export default Events;
