import { Link } from "react-router-dom";
import LogoFacebook from "/assets/logos_svg/logo_facebook.svg";
import LogoInstagram from "/assets/logos_svg/logo_instagram.svg";

function Footer() {
  let isTabletorAbove = false;
  const { innerWidth: width } = window;
  if (width <= 767.97) {
    isTabletorAbove = true;
  }

  const HandleRedirectDisplay = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer>
      <section id="Contact_container">
        <div id="Hours_info">
          <h2>Horaires</h2>
          <table>
            <tbody>
              <tr>
                <th scope="row">Lundi :</th>
                <td>10h00 - 20h30</td>
              </tr>
              <tr>
                <th scope="row">Mardi :</th>
                <td>12h30 - 20h30</td>
              </tr>
              <tr>
                <th scope="row">Mercredi :</th>
                <td>07h00 - 20h30</td>
              </tr>
              <tr>
                <th scope="row">Jeudi :</th>
                <td>12h30 - 20h30</td>
              </tr>
              <tr>
                <th scope="row">Vendredi :</th>
                <td>10h00 - 20h30</td>
              </tr>
              <tr>
                <th scope="row">Samedi :</th>
                <td>09h00 - 12h00</td>
              </tr>
              <tr>
                <th scope="row">Dimanche :</th>
                <td>
                  09h00 - 12h00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="Contact_info">
          <table>
            <tbody>
              <tr>
                <th>📍</th>
                <td>
                  <a
                    href="https://maps.app.goo.gl/8VZHC6K4swqYMEe4A"
                    target="_blank"
                    rel="noreferrer"
                  >
                    4 rue du Thal, 67210 Obernai
                  </a>
                </td>
              </tr>
              <tr>
                <th>📞</th>
                <td>
                  {isTabletorAbove ? <a href="tel:+33614030694">06.14.03.06.94</a> : <p>06.14.03.06.94</p>}
                </td>
              </tr>
              <tr>
                <th>📩</th>
                <td>
                  <a href="mailto:crossfitobernai@gmail.com">crossfitobernai@gmail.com</a>
                </td>
              </tr>
            </tbody>
          </table>
          <div id="Contact_info_Reseaux">
            <p>Suivez-nous !</p>
            <div>
              <a
                href="https://www.facebook.com/cfobernai/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={LogoFacebook} alt="Lien Facebook"></img>
              </a>
              <a
                href="https://www.instagram.com/crossfitobernai/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={LogoInstagram} alt="Lien Instagram" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <div id="Footer_bottom-container">
        <p>
          <Link to="/mentions-legales" onClick={HandleRedirectDisplay}>
            Mentions légales
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
