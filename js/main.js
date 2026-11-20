
/* ==========================================
   JLMV.NET - MAIN JAVASCRIPT
========================================== */


/* 1. TERMINAL BOOT ANIMATION */

const boot = document.getElementById("boot");

const frases = [
  "> initializing system...",
  "> loading user profile: JLMV",
  "> establishing secure connection...",
  "> access granted. Welcome."
];

const sinMovimiento = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


if (boot) {

  if (sinMovimiento) {

    boot.textContent = frases[frases.length - 1];

  } else {

    let fraseActual = 0;
    let caracterActual = 0;

    function escribirTerminal() {

      if (fraseActual >= frases.length) {
        return;
      }

      const frase = frases[fraseActual];

      boot.textContent = frase.slice(
        0,
        caracterActual + 1
      );

      caracterActual++;

      if (caracterActual >= frase.length) {

        fraseActual++;
        caracterActual = 0;

        setTimeout(escribirTerminal, 850);

      } else {

        setTimeout(escribirTerminal, 40);

      }

    }

    escribirTerminal();

  }

}


/* ==========================================
   2. RELOJ DEL SISTEMA
========================================== */

const reloj = document.getElementById("reloj");


function actualizarReloj() {

  if (!reloj) return;

  const ahora = new Date();

  reloj.textContent = ahora.toLocaleTimeString(
    "es-CO",
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "America/Bogota"
    }
  );

}


actualizarReloj();

setInterval(actualizarReloj, 1000);


/* ==========================================
   3. CONTADOR LOCAL SIMULADO
========================================== */

const contador = document.getElementById("contador");

let visitas = 1337;

try {

  const almacenadas = localStorage.getItem("visitas");

  visitas = almacenadas
    ? parseInt(almacenadas, 10) + 1
    : 1337;

  if (!Number.isFinite(visitas) || visitas < 0) {
    visitas = 1337;
  }

  localStorage.setItem("visitas", visitas);

} catch (error) {

  console.warn(
    "Local storage unavailable:",
    error
  );

}


if (contador) {

  contador.textContent = String(visitas).padStart(
    6,
    "0"
  );

}


/* ==========================================
   4. NAVEGACIÓN ACTIVA
========================================== */

const enlaces = document.querySelectorAll(".menu a");

const secciones = document.querySelectorAll(
  "main section[id]"
);


if ("IntersectionObserver" in window) {

  const observador = new IntersectionObserver(

    (entradas) => {

      entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {

          const id = entrada.target.id;

          enlaces.forEach((enlace) => {

            const activo =
              enlace.getAttribute("href") === "#" + id;

            enlace.classList.toggle("activo", activo);

          });

        }

      });

    },

    {
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0
    }

  );


  secciones.forEach((seccion) => {

    observador.observe(seccion);

  });

}


/* ==========================================
   5. NAVEGACIÓN MANUAL
========================================== */

enlaces.forEach((enlace) => {

  enlace.addEventListener("click", () => {

    enlaces.forEach((otro) => {

      otro.classList.remove("activo");

    });

    enlace.classList.add("activo");

  });

});
