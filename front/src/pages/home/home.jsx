// import { useRef, Suspense } from 'react';
import { Suspense } from 'react';

// import { FaExpand } from 'react-icons/fa';
//
// const videoBox= "/assets/video/Header.mp4";
import LoadingSpinner from '../../components/Loading/Spinner/Spinner';

import TitleBackgroundImage from "/assets/title_background/TitleBackground_Crossfit.webp";

function Home() {
  // const videoRef = useRef(null);


  // const handleVideoClick = () => {
  //   if (videoRef.current) {
  //     if (videoRef.current.muted) {
  //       videoRef.current.muted = false;
  //       videoRef.current.volume = 0.2;
  //       videoRef.current.play();
  //     } else {
  //       videoRef.current.muted = true;
  //       videoRef.current.volume = 0;
  //     }
  //
  //   }
  // };
  //
  // const handleFullscreen = () => {
  //   if (videoRef.current) {
  //     if (videoRef.current.requestFullscreen) {
  //       videoRef.current.requestFullscreen();
  //     } else if (videoRef.current.webkitRequestFullscreen) { // Safari
  //       videoRef.current.webkitRequestFullscreen();
  //     } else if (videoRef.current.msRequestFullscreen) { // IE/Edge
  //       videoRef.current.msRequestFullscreen();
  //     }
  //   }
  // };

  return (
    <main className="Home">
      <section className="Slideshow_section">
        <div id="Slideshow_container">
          <Suspense fallback={<LoadingSpinner />}>
            <div className="video_container">
              <iframe width="100%" height="100%"
                      src="https://www.youtube.com/embed/VWaBOMIcbpQ?autoplay=1&loop=1&mute=1&controls=1&playlist=VWaBOMIcbpQ"
                      title="Video CrossfitObernai" frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen></iframe>
            </div>
          </Suspense>
        </div>
      </section>
      <section className="quote_container">
        <h2>Votre santé en mouvement </h2>
        <h3>CrossFit Obernai transforme votre quotidien, à l&apos;intérieur comme à l&apos;extérieur de la salle.</h3>
        <p>Depuis 2021, nous accompagnons des personnes de tous âges et de tous niveaux dans l’amélioration de leur forme physique, de leur bien-être et de leur confiance en soi</p>
        <p>Située au <span className={"bold"}>4 rue du Thal, à Obernai</span>,  notre box vous accueille dans un espace dédié à la <span className={"bold"}>progression</span>, à l’épanouissement et à la convivialité.</p>
        <p>Notre mission : vous offrir le meilleur de l&apos;entraînement fonctionnel grâce à une <span className={"bold"}>programmation variée et exigeante</span>, encadrée par des coachs expérimentés et passionnés.</p>
        <p>Nous proposons des <span className={"bold"}>cours de CrossFit, Hyrox, Pilates, gymnastique, haltérophilie, HIIT et strongman</span>, le tout dans un environnement motivant et bienveillant.</p>
      </section>
      <section className='text__container'>
        <div className="main__header">
          <div className="title_container">
            <img src={TitleBackgroundImage} alt="Background"/>
            <p>Qu&apos;est ce que le</p>
            <h1>CrossFit</h1>
          </div>
        </div>
        <p>
          Le CrossFit est un programme d&apos;entraînement général adapté à
          tous, quelle que soit ta condition physique ou ton âge.
        </p>
        <p>
          Il vise à améliorer ton état de santé global au travers
          d&apos;entraînements fonctionnels où tous les mouvements sont basés
          sur des mouvements naturels du quotidien.
        </p>
        <p>
          Que tes objectifs soient une remise en forme, la préparation
          d&apos;épreuves physiques pour un examen ou un challenge sportif,
          notre méthode saura répondre favorablement à tes attentes.
        </p>
        <p>
          Au travers de coachings personnalisés et adaptés, nous te corrigerons
          sur chaque mouvement, en t&apos;assurant une pratique saine et
          respectueuse de tes capacités ainsi qu&apos;une progression sans
          limite grâce à une programmation variée.
        </p>
        <h2>Les points forts :</h2>
        <ul>
          <li>
            La pratique en petits groupes sous l&apos;égide d&apos;un coach à
            chaque séance
          </li>
          <li>Des séances variées, jamais deux fois le même entraînement !</li>
          <li>
            De multiples stimulis, le but est de t&apos;améliorer dans chaque
            qualité physique reconnue dans le monde du sport
          </li>
          <li>
            Un gros boost sur ta confiance en toi au travers de victoires
            quotidiennes et d&apos;accomplissements aux entraînements
          </li>
          <li>
            Une communauté bienveillante où tout le monde s&apos;encourage et se
            félicite
          </li>
        </ul>
      </section>
    </main>
  );
}

export default Home;
