import { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import TitleBackgroundImage from "/assets/title_background/TitleBackground_Planning.webp";
import PlanningImgDefault from "/assets/Planning/Planning_CFO_2025.webp";

function Planning() {
  const [planningImage, setPlanningImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadPlanningImage();
  }, []);

  const loadPlanningImage = async () => {
    try {
      const data = await authService.getCurrentPlanningImage();
      if (data && data.imageData) {
        setPlanningImage(data.imageData);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erreur lors du chargement du planning:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="Planning">
      <div className="main__header">
        <div className="title_container">
          <img src={TitleBackgroundImage} alt="Background" />
          <p>Consultez</p>
          <h1>Notre planning</h1>
        </div>
      </div>
      <div className="img_zoom">
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <img
            src={planningImage || PlanningImgDefault}
            alt="Planning de la box CrossFit Obernai"
          />
        )}
      </div>
    </main>
  );
}

export default Planning;
