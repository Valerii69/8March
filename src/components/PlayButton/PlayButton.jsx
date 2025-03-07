import React, { useState } from "react";
import "./PlayButton.css";

const PlayButton = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false); // Скритий
    onClick(); 
  };

  return (
    isVisible && (
      <button className="button" onClick={handleClick}>
        <span>Тиць!</span>
      </button>
    )
  );
};

export default PlayButton;
