import TitleBackgroundImage from "/assets/title_background/TitleBackground_Offres.webp";
import LogoPeppy from "/assets/logos_svg/logo_peppy.svg";
import Popup from "../../components/popup/popup";
import {Link} from "react-router-dom";

function Offers() {
  return (
    <main className="offers">
      <div className="main__header">
        <div className="title_container">
          <img src={TitleBackgroundImage} alt="Background" />
          <p>Découvrez</p>
          <h1>Nos offres</h1>
        </div>
      </div>
        <div className={"offers_text_container"}>
            <h2>Les abonnements</h2>
            <p>
                Chez CrossFit Obernai, nous avons à cœur de vous proposer une offre qui s&apos;adapte à votre emploi du temps et vos finances. Tous nos abonnements sont modulables, d&apos;un mois à l&apos;autre, pour répondre au mieux à vos attentes et votre style de vie qui, nous le savons, peut évoluer au fil du temps.
            </p>
            <p>
                Retrouvez également les abonnements seniors, kids et teens à raison
                d&apos;une à deux séances par semaine !
            </p>
            <h2>Les offres à la carte</h2>
            <p>
                Des carnets de séances à recharger en toute autonomie via notre
                application de réservation. Ils sont nominatifs, vous permettent de
                gérer votre budget et votre pratique en toute liberté.
            </p>
        </div>


        <div className={"offers_links"}>
            <div className={"offers_bilan_container"}>
                <h2 className={"offers_bilan_title"}>Réserve ton bilan sport & santé gratuitement avec un pro : </h2>
                <Link to={"/contact"}>Contactez nous !</Link>
            </div>
            <div className="offers_dropin_container">
                <h2 className="offers_dropin_title">Reserve ton Drop-in ici: </h2>
                <a href="https://app.peppy.cool/boxes/crossfit-obernai/ckppkcyv5n6mv0883dup9kj17/book/dropin/?skipPlatformFees=true" rel="noreferrer" target="_blank" className="offers_dropin_link">
                    <img src={LogoPeppy} alt="Peppy" />
                </a>
            </div>
        </div>

    </main>
  );
}

export default Offers;
