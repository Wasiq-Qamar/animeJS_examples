import "./styles.css";
import anime from "animejs/lib/anime.es.js";
import React, { useEffect, useState } from "react";

export default function App() {
  var battery = {
    charged: "0%",
    cycles: 120
  };

  const [content, setContent] = useState(JSON.stringify(battery));

  const objectSelect = () => {};

  useEffect(() => {
    const blocks = document.querySelectorAll(".block");
    blocks[0].style.transform = "translateX(100px)";
    blocks[1].style.transform = "translateX(100px)";
    blocks[2].style.transform = "translateX(100px)";

    anime({
      targets: ".block",
      translateX: {
        value: "*=3.5", // 100px * 2.5 = '250px'
        duration: 1000
      },
      width: {
        value: "-=30px", // 28 - 20 = '8px'
        duration: 1800,
        easing: "easeInOutSine"
      },
      direction: "alternate",
      duration: 1000,
      // easing: "linear",
      loop: true,
      backgroundColor: "#000",
      borderRadius: ["0%", "50%"],
      rotate: {
        value: "+=2turn", // 0 + 2 = '2turn'
        duration: 1800,
        easing: "easeInOutSine"
      },
      delay: anime.stagger(200),
      endDelay: function (el, i, l) {
        return (l - i) * 100;
      }
    });
    anime({
      targets: battery,
      charged: "100%",
      cycles: 130,
      round: 1,
      easing: "linear",
      update: function () {
        setContent(JSON.stringify(battery));
      }
    });

    var grid = document.querySelector(".grid");
    for (var i = 0; i <= 209; i++) {
      const box = document.createElement("div");
      box.classList.add("box");
      grid.appendChild(box);
    }

    anime({
      targets: ".box",
      scale: [
        { value: 0.1, easing: "easeOutSine", duration: 500 },
        { value: 1, easing: "easeInOutQuad", duration: 1200 }
      ],
      delay: anime.stagger(209, { grid: [21, 11], from: "center" }),
      loop: true,
      direction: "alternate"
    });

    var grid2 = document.querySelector(".grid2");
    for (var j = 0; j <= 209; j++) {
      const box2 = document.createElement("div");
      box2.classList.add("box2");
      grid2.appendChild(box2);
    }

    anime({
      targets: ".box2",
      translateX: anime.stagger(10, {
        grid: [21, 11],
        from: "center",
        axis: "x"
      }),
      translateY: anime.stagger(10, {
        grid: [21, 11],
        from: "center",
        axis: "y"
      }),
      rotateZ: anime.stagger([0, 180], {
        grid: [21, 11],
        from: "center",
        axis: "x"
      }),
      delay: anime.stagger(200, { grid: [21, 11], from: "center" }),
      easing: "easeInOutQuad",
      direction: "alternate",
      loop: true
    });

    var path = anime.path(".motion-path path");

    anime({
      targets: ".box-black",
      translateX: path("x"),
      translateY: path("y"),
      rotate: path("angle"),
      easing: "linear",
      duration: 3000,
      loop: true,
      direction: "alternate"
    });
  }, []);

  return (
    <div className="App">
      <h1>CSS Selector</h1>

      <div className="container"></div>
      <div className="block"></div>
      <br />
      <div className="container"></div>
      <div className="block"></div>
      <br />
      <div className="container"></div>
      <div className="block"></div>

      <div className="battery">
        <p className="battery-log"> {content}</p>
      </div>

      <div className="grid"></div>

      <div className="grid2Container">
        <div className="grid2"></div>
      </div>

      <div>
        <div className="box-black"></div>
        <svg
          width="10em"
          height="10em"
          viewBox="0 0 24 24"
          className="motion-path"
        >
          <path d="m9.573 20c-.076 0-.152-.017-.223-.052-.214-.107-.322-.35-.259-.581l1.753-6.367h-3.344c-.189 0-.362-.107-.447-.276-.084-.169-.066-.372.047-.523l5.983-8c.138-.185.385-.251.596-.161.212.09.335.313.298.541l-.888 5.419h3.411c.19 0 .364.108.449.279.084.171.063.375-.053.526l-6.927 9c-.097.126-.245.195-.396.195zm-1.074-8h3.001c.156 0 .303.073.398.197.094.125.125.286.084.436l-1.25 4.542 4.752-6.175h-2.984c-.147 0-.286-.064-.381-.176s-.136-.26-.113-.405l.653-3.982z" />
        </svg>
      </div>
    </div>
  );
}
