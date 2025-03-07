import React from "react";
import "./index.css";
const PlayButton = ({ onClick }) => (
  <button className="button" onClick={onClick}>
    <span>Тиць сюди</span>
  </button>
);

export default PlayButton;
