// components/AudioPlayer.js
import React from "react";
import Shubinio from "../Shubinio.mp3";

const MusicPlay = () => (
  <figure>
    <figcaption>Listen :</figcaption>
    <audio controls src={Shubinio} autoPlay></audio>
  </figure>
);

export default MusicPlay;
