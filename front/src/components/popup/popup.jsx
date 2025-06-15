import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PopupImagePc from "/assets/popup/Popup_pc.webp";
import PopupImageTel from "/assets/popup/Popup_tel.webp";
import useWindowDimensions from "../../hooks/useWindowDimensions/useWindowDimensions.js";
import { useSwipeable } from 'react-swipeable';
import { motion } from "framer-motion";


function Popup() {
  const [isOpen, setIsOpen] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isTabletorAbove, setIsTabletorAbove] = useState();

  const location = useLocation();

  // Ajouter cet useEffect pour reset le popup
  useEffect(() => {
    if (location.pathname != "/contact") {
      setIsOpen(true);
      setIsButtonClicked(false);
    }
  }, [location.pathname]);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setScrollY(window.scrollY);
      } else {
        setTimeout(() => {
          setScrollY(window.scrollY);
        }, 500);
      }


    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [scrollY]);

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (width <= 1024) {
      setIsTabletorAbove(false);
    } else setIsTabletorAbove(true);
  }, [isTabletorAbove, height, width]);

  const handleClosePopup = () => {
    setIsButtonClicked(true);
    setTimeout(() => setIsOpen(false), 0);
  };

  const handleRedirectionDisplay = () => window.scrollTo(0, 0);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleClosePopup(),
    onSwipedRight: () => handleClosePopup(),
    onSwipedUp: () => handleClosePopup(),
    preventScrollOnSwipe: true,
    trackMouse: true
  })

  return (
    <>
      {/* Tel popup */}

      {isOpen && !isTabletorAbove && (

        <aside className={`PopupTel ${scrollY > 100 ? 'scroll' : 'fixe'}`} {...handlers}>
          <motion.div drag dragConstraints={{ right: 0, left: 0, bottom: 0 }} >
            <div>
              <Link to={"/contact"} onClick={() => {
                handleRedirectionDisplay();
                handleClosePopup();
              }}>
                <img src={PopupImageTel} alt="Link for a free trial" id="PopupImageTel" aria-label="Link for a free trial" />
              </Link>
            </div>
          </motion.div>
        </aside>

      )}

      {/* Pc popup */}

      {isOpen && isTabletorAbove && (
        <aside
          className={`PopupPC ${isButtonClicked ? "close-animation-pc" : ""}`}
        >

          <div>
            <button className={`close-button`} onClick={handleClosePopup}>
              X
            </button>
          </div>
          <Link to={"contact"} onClick={() => {
            handleRedirectionDisplay();
            handleClosePopup();
          }}>
            <div>
              <img src={PopupImagePc} alt="Link for a free trial" aria-label="Link for a free trial" />
            </div>
          </Link>
        </aside>
      )}
    </>
  );
}

export default Popup;
