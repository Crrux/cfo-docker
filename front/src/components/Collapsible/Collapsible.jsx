import { useState } from "react";
import PropTypes from "prop-types";

function Collapsible({ index, titre, children }) {
  titre = titre.toUpperCase();
  const [isActive, setIsActive] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const handleClick = () => {
    setIsActive(!isActive);
    if (isFirstClick) {
      setIsFirstClick(false);
    }
  };
  return (
    <div className="collapsible">
      <button
        className={`collapsible-button ${!isFirstClick ? (isActive ? "active" : "inactive") : ""
          }`} onClick={handleClick} type="button" style={{ backgroundColor: `${index % 2 === 0 ? '#36d6e7' : '#da4f84'}` }}
      >
        <p className="collapsible-button_title">
          {titre.split("").map((letter, index) => (
            letter !== " " ? <span key={index}>{letter}</span> : " "
          ))}</p>

        <i
          id="icon"
          className={`fa-solid fa-chevron-up ${!isFirstClick
            ? isActive
              ? "icon-down-rotated"
              : "icon-up-rotated"
            : ""
            }`}
        ></i>
      </button>

      <div
        className={`collapsible-content ${!isFirstClick ? (isActive ? "active" : "inactive") : ""
          }`}
      >
        {children}
      </div>
    </div>
  );
}

Collapsible.propTypes = {
  index: PropTypes.number,
  titre: PropTypes.string,
  children: PropTypes.node,
};

export default Collapsible;
