import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { gsap } from "gsap"; // GSAP для анімації
import Typed from "typed.js"; // Typed.js для тексту
import Carpet from "./carpetSmoll.png"; // Імпорт зображення

function App() {
  const petalsRef = useRef(null);
  const textRef = useRef(null);
  const authorRef = useRef(null);
  const carpetRef = useRef(null); // 👈 Додаємо ref для килима
  const [showCarpet, setShowCarpet] = useState(false); // Стан для килима

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

    // Анімація тексту Typed.js
    if (textRef.current) {
      const typed = new Typed(textRef.current, {
        // strings: [
        //   "З 8 березня вітаю! <br> Вибач, квітів не дарю, <br> Від душі поздоровляю <br> І листа тобі я шлю. <br>В ньому просто все й красиво,<br> Теплота моїх думок,<br> Хочу, щоб жила щасливо, <br> Найпрекрасніша з жінок.",
        // ],
        strings: [
          "Нехай тендітні пахощі троянд<br> Навіють щастя, ніжність і кохання,<br>Хай здійснює бажання зорепад<br> І втілює у дійсність сподівання! <br>Нехай тобі вдається все — вдень, вночі,<br> Хай очі посміхаються натхненно,<br> І смак життя, і молодість душі <br>Нехай для тебе тривають  нескінченно!",
        ],
        startDelay: 3000,
        typeSpeed: 50,
        backSpeed: 0,
        fadeOut: true,
        loop: false,
        showCursor: false,
        onComplete: function () {
          if (authorRef.current) {
            authorRef.current.style.opacity = 1;
            setShowCarpet(true); // Вмикаємо килим після тексту
          }
        },
      });

      return () => typed.destroy();
    }
  }, []);

  // Додаємо клас "show" після рендеру килима
  useEffect(() => {
    if (showCarpet && carpetRef.current) {
      requestAnimationFrame(() => {
        carpetRef.current.classList.add("show");
      });
    }
  }, [showCarpet]);

  return (
    <div>
      {/* Контейнер для пелюсток */}
      <div id="petals" ref={petalsRef}></div>

      {/* Блок для анімації тексту */}
      <div id="scene">
        <div id="card">
          <p id="greeting">Люба, з 8 березня!</p>
          <p>
            <span id="text" ref={textRef}></span>
          </p>
          <p id="author" ref={authorRef} style={{ opacity: 0 }}>
            З любов'ю Валера
          </p>
          {/* Килим з’являється після тексту */}
          {showCarpet && (
            <div id="carpet" ref={carpetRef} >
              <img src={Carpet} alt="Carpet" />
            </div>
          )}
        </div>
      </div>
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