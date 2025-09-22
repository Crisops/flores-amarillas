// Sincronizar las letras con la canción
// Cachear elementos DOM para mejor rendimiento
const audio = document.querySelector("audio");
const lyrics = document.querySelector("#lyrics");
const titulo = document.querySelector(".titulo");

// Validar que los elementos existan
if (!audio || !lyrics || !titulo) {
  console.error(
    "Error: No se pudieron encontrar los elementos necesarios en el DOM"
  );
}

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
const lyricsData = [
  { text: "At the time", time: 15 },
  { text: "The whisper of birds", time: 18 },
  { text: "Lonely before the sun cried", time: 27 },
  { text: "Fell from the sky", time: 32 },
  { text: "Like water drops", time: 33 },
  { text: "Where I'm now? I don't know why", time: 41 },
  { text: "Nice butterflies in my hands", time: 47 },
  { text: "Too much light for twilight", time: 54 },
  { text: "In the mood for the flowers love", time: 59 },
  { text: "That vision", time: 67 },
  { text: "Really strong, blew my mind", time: 72 },
  { text: "Silence Let me see what it was", time: 78 },
  { text: "I only want to live in clouds", time: 83 },
  { text: "Where I'm now? I don't know why", time: 91 },
  { text: "Nice butterflies in my hands", time: 97 },
  { text: "Too much light for twilight", time: 104 },
  { text: "In the mood for the flowers love", time: 108 },
  { text: "At the time", time: 144 },
  { text: "The whisper of birds", time: 148 },
  { text: "Lonely before the sun cried", time: 153 },
  { text: "Fell from the sky", time: 158 },
  { text: "Like water drops", time: 164 },
  { text: "Where I'm now? I don't know why", time: 169 },
  { text: "Nice butterflies in my hands", time: 176 },
  { text: "Too much light for twilight", time: 183 },
  { text: "In the mood for the flowers", time: 188 },
  { text: "Love.", time: 193 },
];

// Variables para optimización
let currentLyricIndex = -1;
let lastUpdateTime = -1;

// Animar las letras con mejor rendimiento
function updateLyrics() {
  // Solo actualizar si el audio está disponible y reproduciéndose
  if (!audio || audio.paused) {
    requestAnimationFrame(updateLyrics);
    return;
  }

  const currentTime = audio.currentTime;
  const time = Math.floor(currentTime);

  // Optimización: solo buscar si el tiempo ha cambiado
  if (time === lastUpdateTime) {
    requestAnimationFrame(updateLyrics);
    return;
  }

  lastUpdateTime = time;

  // Buscar la línea actual de manera más eficiente
  let foundLine = null;
  let foundIndex = -1;

  for (let i = 0; i < lyricsData.length; i++) {
    const line = lyricsData[i];
    if (time >= line.time && time < line.time + 6) {
      foundLine = line;
      foundIndex = i;
      break;
    }
  }

  // Solo actualizar DOM si cambió la línea
  if (foundIndex !== currentLyricIndex) {
    currentLyricIndex = foundIndex;

    if (foundLine) {
      // Calcula la opacidad basada en el tiempo en la línea actual
      const fadeInDuration = 0.1;
      const opacity = Math.min(
        1,
        (currentTime - foundLine.time) / fadeInDuration
      );

      // Usar requestAnimationFrame para suavizar las transiciones
      lyrics.style.opacity = opacity;
      lyrics.textContent = foundLine.text; // textContent es más rápido que innerHTML
    } else {
      // Restablece la opacidad y el contenido si no hay una línea actual
      lyrics.style.opacity = 0;
      lyrics.textContent = "";
    }
  }

  // Continuar la animación
  requestAnimationFrame(updateLyrics);
}

// Iniciar la animación cuando el audio esté listo
if (audio) {
  audio.addEventListener("loadeddata", () => {
    requestAnimationFrame(updateLyrics);
  });

  // Manejo de errores de audio
  audio.addEventListener("error", (e) => {
    console.error("Error al cargar el audio:", e);
  });
}

// Función optimizada para ocultar el título después de 216 segundos
function ocultarTitulo() {
  if (!titulo) {
    console.warn("Elemento titulo no encontrado");
    return;
  }

  titulo.style.animation = "fadeOut 3s ease-in-out forwards";

  // Usar requestAnimationFrame para mejor rendimiento
  setTimeout(() => {
    requestAnimationFrame(() => {
      titulo.style.display = "none";
    });
  }, 3000);
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);
