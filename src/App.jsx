import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { gsap } from "gsap"; // GSAP для анимации
import Typed from "typed.js"; // Typed.js для текста
import Carpet from "./carpetSmoll.png"

function App() {
  const petalsRef = useRef(null);
  const textRef = useRef(null);
  const authorRef = useRef(null);
  const [showCarpet, setShowCarpet] = useState(false); // состояние для ковра

  useEffect(() => {
    const warp = petalsRef.current;
    const total = 50;
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (!warp) return;

    for (let i = 0; i < total; i++) {
      const div = document.createElement("div");
      gsap.set(div, {
        attr: { class: "dot" },
        x: R(0, w),
        y: R(-200, -150),
        z: R(-200, 200),
      });
      warp.appendChild(div);
      animm(div, h);
    }

    function animm(elm, h) {
      gsap.to(elm, {
        duration: R(6, 15),
        y: h + 100,
        ease: "none",
        repeat: -1,
        delay: -15,
      });
      gsap.to(elm, {
        duration: R(4, 8),
        x: "+=100",
        rotationZ: R(0, 180),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(elm, {
        duration: R(2, 8),
        rotationX: R(0, 360),
        rotationY: R(0, 360),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: -5,
      });
    }

    function R(min, max) {
      return min + Math.random() * (max - min);
    }

    // Анимация текста Typed.js
    if (textRef.current) {
      const typed = new Typed(textRef.current, {
        strings: [
          "Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам 'lorem ipsum' сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий.",
        ],
        startDelay: 3000,
        typeSpeed: 80,
        backSpeed: 0,
        fadeOut: true,
        loop: false,
        showCursor: false,
        onComplete: function () {
          if (authorRef.current) {
            authorRef.current.style.opacity = 1;
            setTimeout(() => setShowCarpet(true), 1000); // показываем ковер через 1 сек
          }
        },
      });

      return () => typed.destroy();
    }
  }, []);

  return (
    <div>
      {/* Контейнер для лепестков */}
      <div id="petals" ref={petalsRef}></div>

      {/* Блок для анимации текста */}
      <div id="scene">
        <div id="card">
          <p id="greeting">Люба, з 8 березня!</p>
          <p>
            <span id="text" ref={textRef}></span>
          </p>
          <p id="author" ref={authorRef} style={{ opacity: 0 }}>
            З любовью Валера
          </p>
          {/* Ковер появляется после автора */}
          {showCarpet && <img id="carpet" src={Carpet} alt="Carpet" />}
        </div>
      </div>
    </div>
  );
}

export default App;
