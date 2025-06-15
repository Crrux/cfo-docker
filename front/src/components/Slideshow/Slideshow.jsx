import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Slideshow({ data, autoplay, autoplayDelay, buttonEnabled }) {
  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex]);

  useEffect(() => {
    let autoplayTimeout = null;
    if (autoplay) {
      autoplayTimeout = setTimeout(() => {
        setSlideIndex((prevIndex) => prevIndex + 1);
      }, autoplayDelay);
    }
    return () => {
      if (autoplayTimeout) {
        clearTimeout(autoplayTimeout);
      }
    };
  }, [slideIndex, autoplay, autoplayDelay]);

  const showSlides = (n) => {
    let i;
    const slides = document.getElementsByClassName("myPictures");

    if (n > slides.length) {
      setSlideIndex(1);
      return;
    }
    if (n < 1) {
      setSlideIndex(slides.length);
      return;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[n - 1].style.display = "block";
  };

  const plusSlides = (n) => {
    setSlideIndex((prevIndex) => prevIndex + n);
  };

  return (
    <section className="slideshow-container">
      <div className="mySlides">
        {data ? (
          <>
            {data.map((pictures, index) => (
              <div key={index} className="myPictures fade">
                <div className="myPictures--imgcontainer">
                  <img
                    src={`/assets/Slideshow/${pictures.src}`}
                    alt={`${pictures.alt}`}
                  />
                </div>

                {/* <p className="myPictures--indexation">
                  {slideIndex}/{data.length}
                </p> */}
              </div>
            ))}
          </>
        ) : (
          ""
        )}
      </div>

      {data.length > 1 && buttonEnabled ? (
        <button className="prev" onClick={() => plusSlides(-1)} type="button">
          &#10094;
        </button>
      ) : (
        ""
      )}
      {data.length > 1 && buttonEnabled ? (
        <button className="next" onClick={() => plusSlides(1)} type="button">
          &#10095;
        </button>
      ) : (
        ""
      )}
    </section>
  );
}

Slideshow.propTypes = {
  data: PropTypes.array.isRequired,
  autoplay: PropTypes.bool,
  autoplayDelay: PropTypes.number,
  buttonEnabled: PropTypes.bool,
};

export default Slideshow;
