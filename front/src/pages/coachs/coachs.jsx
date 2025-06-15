import Popup from "../../components/popup/popup";
import TitleBackgroundImage from "/assets/title_background/TitleBackground_Coachs.webp";

function Coach() {
  return (
    <main id="main_coach">
      <div className="main__header">
        <div className="title_container">
          <img src={TitleBackgroundImage} alt="Background" />
          <p>Notre équipe</p>
          <h1>Les coachs</h1>
        </div>
      </div>
    </main>
  );
}

export default Coach;
