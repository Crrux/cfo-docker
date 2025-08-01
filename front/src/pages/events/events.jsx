import { useRef, Suspense } from 'react';

import TitleBackgroundImage from "/assets/title_background/TitleBackground_Evenements.webp";
import LoadingSpinner from "../../components/Loading/Spinner/Spinner.jsx";
const videoEvenement= "/assets/video/Evenements.mp4";

function Events() {
  const videoRef = useRef(null);


  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.muted) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.2;
        videoRef.current.play();
      } else {
        videoRef.current.muted = true;
        videoRef.current.volume = 0;
      }

    }
  };

  return (
      <main className="event_main">
        <div className="main__header">
          <div className="title_container">
            <img src={TitleBackgroundImage} alt="Background"/>
            <p>Toute l&apos;année</p>
            <h1>Les événements</h1>
          </div>
        </div>
        <div className={"video_container"}>
          <Suspense fallback={<LoadingSpinner/>}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/JsHHZFt23Mo?autoplay=1&loop=1&mute=1&controls=1&playlist=JsHHZFt23Mo"
                    title="Crossfit Obernai Evenement" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>
          </Suspense>
        </div>
        <div className={"text_container"}>
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
                  style={{textDecoration: "none"}}
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
        </div>
      </main>
  );
}

export default Events;
