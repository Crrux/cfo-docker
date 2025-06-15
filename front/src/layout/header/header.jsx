import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "/assets/Header_logo.webp";

import { LinksLocal } from "./links.js";
import useWindowDimensions from "../../hooks/useWindowDimensions/useWindowDimensions.js";

function Header() {
  const location = useLocation();
  const [isTabletorAbove, setIsTabletorAbove] = useState(false);
  const { width } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (width <= 1024) {
      setIsTabletorAbove(false);
    } else setIsTabletorAbove(true);
  }, [isTabletorAbove, width]);

  const handleShowLinks = () => setIsOpen(!isOpen);
  const handleShowLinksRedirection = () => {
    window.scrollTo(0, 0);
    if (setIsTabletorAbove) setIsOpen(false);
  };

  return (
    <header>
      <div className="logo">
        <Link to={"/"} onClick={handleShowLinksRedirection} aria-label="Retour à l'accueil CrossFit Obernai"
        >
          <img src={Logo} alt="Logo CrossFit Obernai" id="Header_Logo" title="Accueil" />
        </Link>
      </div>
      <div className={`navbar__button ${isOpen ? "show-nav" : ""}`}>
        <button className="navbar__burger" onClick={handleShowLinks} aria-label="Toggle navigation">
          <span className="burger-bar"></span>
        </button>
      </div>

      <nav className={`navbar ${isOpen ? "show-nav" : "hide-nav"}`}>
        <ul className="navbar__links">
          <li className="navbar__logo">
            <Link to={"/"} onClick={handleShowLinksRedirection}>
              <img src={Logo} id="navburger-logo" alt="Logo Crossfit Obernai - Link to Home" />
            </Link>
          </li>
          <li className="navbar__item">
            <Link
              to={"/"}
              className={`navbar__link`}
              onClick={handleShowLinksRedirection}
              aria-label="Link to Home"
            >
              <i className="fa-solid fa-house" id="home_link"></i>
            </Link>
          </li>
          {/* <li className="navbar__item">
            <Link
              to={LinksLocal.class}
              className={`navbar__link ${location.pathname === LinksLocal.class && isTabletorAbove
                ? "activeNavLink"
                : ""
                }`}
              onClick={handleShowLinksRedirection}
            >
              Nos Cours
            </Link>
          </li> */}
          <li className="navbar__item">
            <Link
              to={LinksLocal.class}
              className={`navbar__link ${location.pathname === LinksLocal.class && isTabletorAbove
                ? "activeNavLink"
                : ""
                }`}
              onClick={handleShowLinksRedirection}
            >
              Nos Séances
            </Link>
          </li>
          <li className="navbar__item">
            <Link
              to={LinksLocal.planning}
              className={`navbar__link ${location.pathname === LinksLocal.planning && isTabletorAbove
                ? "activeNavLink"
                : ""
                }`}
              onClick={handleShowLinksRedirection}
            >
              Planning
            </Link>
          </li>
          <li className="navbar__item">
            <Link
              to={LinksLocal.offers}
              className={`navbar__link ${location.pathname === LinksLocal.offers && isTabletorAbove
                ? "activeNavLink"
                : ""
                }`}
              onClick={handleShowLinksRedirection}
            >
              Les offres
            </Link>
          </li>
          {/* <li className="navbar__item">
            <Link
              to={LinksLocal.coachs}
              className={`navbar__link ${location.pathname === LinksLocal.coachs && isTabletorAbove
                ? "activeNavLink"
                : ""
                }`}
              onClick={handleShowLinksRedirection}
            >
              Nos Coachs
            </Link>
          </li> */}
          <li className="navbar__item">
            <Link
              to={LinksLocal.events}
              className={`navbar__link ${location.pathname === LinksLocal.events && isTabletorAbove
                ? "activeNavLink"
                : ""
                }`}
              onClick={handleShowLinksRedirection}
            >
              Événements
            </Link>
          </li>
          <li className="navbar__item">
            <Link
              to={LinksLocal.contact}
              className={`navbar__link ${location.pathname === LinksLocal.contact && isTabletorAbove
                ? "activeNavLink"
                : ""
                }`}
              onClick={handleShowLinksRedirection}
            >
              Contact
            </Link>
          </li>
          {/* <li className="navbar__item">
            <Link
              to={"testerreur"}
              className={`navbar__link`}
              onClick={handleShowLinksRedirection}
            >
              Test erreur
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
