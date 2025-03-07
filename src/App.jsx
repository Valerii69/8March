import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { gsap } from "gsap";
import Typed from "typed.js";
import Carpet from "./carpetSmoll.png";
import Shubinio from "/Shubinio.mp3";

const TOTAL_PETALS = 50;

function App() {
  const petalsRef = useRef(null);
  const textRef = useRef(null);
  const authorRef = useRef(null);
  const carpetRef = useRef(null);
  const [showCarpet, setShowCarpet] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false); // New state to track play
  const carpetSound = useRef(new Audio(Shubinio));

  useEffect(() => {
    if (!petalsRef.current) return;

    if (startAnimation) {
      preloadAudio();
      createPetals(petalsRef.current, TOTAL_PETALS);
      animateText();
    }
  }, [startAnimation]); //Trigger when startAnimation changes 

  useEffect(() => {
    if (showCarpet && carpetRef.current) {
      requestAnimationFrame(() => {
        gsap.fromTo(
          carpetRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
        );
        carpetRef.current.classList.add("show");
      });

      playCarpetSound();
    }
  }, [showCarpet]);

  function preloadAudio() {
    carpetSound.current.load();
  }

  function createPetals(container, total) {
    const { innerWidth: w, innerHeight: h } = window;

    for (let i = 0; i < total; i++) {
      const div = document.createElement("div");
      div.className = "dot";
      gsap.set(div, {
        x: random(0, w),
        y: random(-200, -150),
        z: random(-200, 200),
      });
      container.appendChild(div);
      animatePetal(div, h);
    }
  }

  function animatePetal(elm, height) {
    gsap.to(elm, {
      duration: random(6, 15),
      y: height + 100,
      ease: "none",
      repeat: -1,
      delay: -15,
    });
    gsap.to(elm, {
      duration: random(4, 8),
      x: "+=100",
      rotationZ: random(0, 180),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(elm, {
      duration: random(2, 8),
      rotationX: random(0, 360),
      rotationY: random(0, 360),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: -5,
    });
  }

  function animateText() {
    if (!textRef.current) return;

    const typed = new Typed(textRef.current, {
      strings: [
        "Нехай тендітні пахощі троянд<br> Навіють щастя, ніжність і кохання,<br>Хай здійснює бажання зорепад<br> І втілює у дійсність сподівання! <br>Нехай тобі вдається все — вдень, вночі,<br> Хай очі посміхаються натхненно,<br> І смак життя, і молодість душі <br>Нехай для тебе тривають нескінченно!",
      ],
      startDelay: 3000,
      typeSpeed: 5,
      fadeOut: true,
      loop: false,
      showCursor: false,
      onComplete: () => {
        if (authorRef.current) authorRef.current.style.opacity = 1;
        setShowCarpet(true);
      },
    });

    return () => typed.destroy();
  }

  function playCarpetSound() {
    const playAudio = () => {
      carpetSound.current
        .play()
        .catch((error) => console.log("Автовідтворення заблоковано:", error));
      document.removeEventListener("click", playAudio);
    };

    document.addEventListener("click", playAudio);
  }

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function handlePlayClick() {
    setStartAnimation(true); // Trigger animation and content visibility after click
  }

  return (
    <div>
      {/* Show the play button initially */}
      <button className="button" onClick={handlePlayClick}>
        <span>Тиць сюди </span>
      </button>

      {/* Show the audio controls only after clicking play */}
      {startAnimation && (
        <>
          <figure>
            <figcaption>Listen :</figcaption>
            <audio controls src={Shubinio} autoPlay></audio>
          </figure>

          {/* The petals and scene are only shown after play */}
          <div id="petals" ref={petalsRef}></div>
          <div id="scene">
            <div id="card">
              <p id="greeting">Люба, з 8 березня!</p>
              <p>
                <span id="text" ref={textRef}></span>
              </p>
              <p id="author" ref={authorRef} style={{ opacity: 0 }}>
                З любов'ю Валера
              </p>
              {showCarpet && (
                <div id="carpet" ref={carpetRef}>
                  <img src={Carpet} alt="Carpet" />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

/* А жінка буває на осінь так схожа:
То тиха й привітна, а то непогожа,
То скропить сльозою, то сонцем засвітить,
То прагне зими, то вертається в літо.

А жінка, як осінь, плодами багата:
На ніжність, добро, материнство і свято,
Як вересень тихий, зігріє душею —
Не страшно негоду чекати із нею!

А жінка буває тривожна, як осінь:
То дихає вітром, то ласки попросить,
То болю завдасть, а то вигоїть рани,
Листочком у світ полетить за коханим!

А осінь в природі — незвідане диво,
Так само і жінка: буває вродлива,
Буває примхлива, буває чутлива,
Нехай тільки кожна з них буде щаслива!
/////////////////
Нехай тендітні пахощі троянд
Навіють щастя, ніжність і кохання,
Хай здійснює бажання зорепад
І втілює у дійсність сподівання!
Хай вам вдається все — вдень і вночі,
Хай очі посміхаються натхненно,
І смак життя, і молодість душі
Нехай для вас тривають нескінченно!
*/
