/* ======================================================
   ✏️  EDITA AQUÍ TODO LO PERSONAL DE LA PÁGINA
   ====================================================== */
const config = {
  girlfriendName: "mi niña",
  relationshipStartDate: "2026-06-02T00:00:00", // fecha de inicio (aaaa-mm-dd)
  heroPhoto: "imag/rizada.jpeg", // ej: "fotos/nosotras.jpg"

  song: {
    title: "Disfruto",
    artist: "carla morrison",
    src: "audio/audio.mp4" // ej: "audio/cancion.mp3"
  },

  // Fotos de la galería: agrega/quita objetos libremente
  gallery: [
    { src: "imag/avena.jpeg", phrase: "Este momento lo guardaría mil veces." },
    { src: "imag/sena.jpeg", phrase: "Aquí estaba siendo feliz sin darme cuenta." },
    { src: "imag/foti1.jpeg", phrase: "Una de mis fotos favoritas." },
    { src: "imag/helado.jpeg", phrase: "Tú haces bonita esta foto." }
  ],

  // Las 4 cosas que aprendi de ella
  loveThings: [
    { title: "Me encanta tenerte en mi vida", text: "a veces no existen suficientes palabras, para explicar lo bonito que se siente encontrarte entre tantas personas y justo coincidimos nosotras." },
    { title: "Me haces sentir en casa", text: "no importa donde estemos, hay algo en estar cotigo que hace que todo se sienta un poquito mas tranquilo, mas bonito y mas nuestro." },
    { title: "Te elegiria otravez", text: "Si pudiera volver al 14 de febrero, sabiendo todo lo que vendría después, volvería a acercarme a ti. Volvería a conocerte, a molestarte, a enamorarme y a construir todo esto contigo." },
    { title: "Me acuerdo de más cosas de ti de las que crees", text: "Puede que a veces se me escape algún detalle, pero hay pequeñas cosas tuyas que se me quedan guardadas sin que siquiera te des cuenta. Gestos,palabras,miradas,esas cositas que son muy tú." }
  ]
};

/* ====================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --- Rellenar datos personalizables ---
  if (config.heroPhoto) document.getElementById("heroPhoto").src = config.heroPhoto;
  document.getElementById("songTitle").textContent = "🎵 " + config.song.title;
  document.getElementById("songArtist").textContent = "🎤 " + config.song.artist;
  if (config.song.src) document.getElementById("audio").src = config.song.src;

  renderGallery();
  renderLoveCards();
  startFloatingHearts();

  // --- Pantalla de bienvenida ---
  document.getElementById("enterBtn").addEventListener("click", enterSite);

  // --- Contador ---
  updateCounter();
  setInterval(updateCounter, 1000);

  // --- Revelado al hacer scroll ---
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // --- Barra de progreso + botón volver arriba ---
  window.addEventListener("scroll", onScroll);

  // --- Carta ---
  document.getElementById("envelope").addEventListener("click", openLetter);
  document.getElementById("openLetterBtn").addEventListener("click", openLetter);

  // --- Canción ---
  document.getElementById("playBtn").addEventListener("click", toggleSong);

  // --- Música de fondo (toggle general, usa el mismo audio) ---
  document.getElementById("musicToggle").addEventListener("click", toggleSong);

  // --- Botón volver arriba ---
  document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- Pregunta final ---
  document.getElementById("finalBtn").addEventListener("click", showFinalMessage);

  // --- Easter egg: clics sobre el título del final ---
  let clickCount = 0;
  document.getElementById("secretHeart").addEventListener("click", () => {
    clickCount++;
    if (clickCount >= 5) {
      alert("¿Todavía no te has dado cuenta de que te quiero muchísimo? ♡");
      clickCount = 0;
    }
  });
});

/* ---------- Bienvenida ---------- */
function enterSite() {
  document.getElementById("welcome").classList.add("hidden");
  document.getElementById("mainContent").classList.remove("hidden");
  burstHearts(document.body, 18);
  window.scrollTo(0, 0);
}

/* ---------- Contador dinámico ---------- */
function updateCounter() {
  const start = new Date(config.relationshipStartDate);
  const now = new Date();
  let diffMs = now - start;
  if (diffMs < 0) diffMs = 0;

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDaysFull = Math.floor(totalHours / 24);

  // Meses completos desde la fecha de inicio
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  const monthMark = new Date(start);
  monthMark.setMonth(monthMark.getMonth() + months);
  if (monthMark > now) { months--; monthMark.setMonth(monthMark.getMonth() - 1); }
  const days = Math.floor((now - monthMark) / (1000 * 60 * 60 * 24));

  document.getElementById("cMonths").textContent = String(months).padStart(2, "0");
  document.getElementById("cDays").textContent = String(days).padStart(2, "0");
  document.getElementById("cHours").textContent = String(totalHours % 24).padStart(2, "0");
  document.getElementById("cMinutes").textContent = String(totalMinutes % 60).padStart(2, "0");
  document.getElementById("cSeconds").textContent = String(totalSeconds % 60).padStart(2, "0");
}

/* ---------- Galería ---------- */
function renderGallery() {
  const wrap = document.getElementById("gallery");
  config.gallery.forEach((item, i) => {
    const tilt = (i % 2 === 0 ? -1 : 1) * (3 + (i % 3) * 2);
    const card = document.createElement("div");
    card.className = "polaroid";
    card.style.setProperty("--tilt", tilt + "deg");
    card.innerHTML = `
      <div class="ph-img">${item.src ? `<img src="${item.src}" alt="" style="width:100%;height:100%;object-fit:cover;">` : "Agrega tu foto aquí"}</div>
      <p>${item.phrase}</p>`;
    wrap.appendChild(card);
  });
}

/* ---------- 4 cosas que amo ---------- */
function renderLoveCards() {
  const wrap = document.getElementById("loveGrid");
  config.loveThings.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "love-card";
    card.innerHTML = `
      <span class="num">0${i + 1}</span>
      <span class="title">${item.title}</span>
      <p class="detail">${item.text}</p>`;
    card.addEventListener("click", () => card.classList.toggle("open"));
    wrap.appendChild(card);
  });
}

/* ---------- Carta interactiva ---------- */
function openLetter() {
  const envelope = document.getElementById("envelope");
  const letter = document.getElementById("letterText");
  if (envelope.classList.contains("open")) return;
  envelope.classList.add("open");
  setTimeout(() => {
    letter.classList.remove("hidden");
    burstHearts(document.getElementById("envelope"), 14);
  }, 400);
  const audio = document.getElementById("audio");
  if (config.song.src && audio.paused) audio.play().catch(() => {});
}

/* ---------- Canción ---------- */
function toggleSong() {
  const audio = document.getElementById("audio");
  const eq = document.getElementById("eq");
  const playBtn = document.getElementById("playBtn");
  if (!config.song.src) { alert("Agrega el archivo de la canción en config.song.src"); return; }
  if (audio.paused) {
    audio.play().catch(() => {});
    eq.classList.add("playing");
    playBtn.textContent = "♡ Pausar";
  } else {
    audio.pause();
    eq.classList.remove("playing");
    playBtn.textContent = "♡ Reproducir";
  }
}

/* ---------- Pregunta final ---------- */
function showFinalMessage() {
  document.getElementById("finalMessage").classList.remove("hidden");
  burstHearts(document.querySelector(".final-section"), 30);
}

/* ---------- Corazones flotantes de fondo ---------- */
function startFloatingHearts() {
  const container = document.getElementById("floatingHearts");
  setInterval(() => {
    const heart = document.createElement("span");
    heart.textContent = "♡";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = 0.7 + Math.random() * 1 + "rem";
    heart.style.animationDuration = 8 + Math.random() * 6 + "s";
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 15000);
  }, 1800);
}

/* ---------- Explosión de corazones (evento puntual) ---------- */
function burstHearts(target, amount) {
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");
    heart.textContent = "♡";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    heart.style.fontSize = 1 + Math.random() * 1.2 + "rem";
    heart.style.color = "#c48b93";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = 1000;
    heart.style.animation = `float-up ${2 + Math.random() * 2}s ease-out forwards`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }
}

/* ---------- Scroll: barra de progreso + botón subir ---------- */
function onScroll() {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrollTop / height) * 100 : 0;
  document.getElementById("progressBar").style.width = progress + "%";

  const backToTop = document.getElementById("backToTop");
  if (scrollTop > 500) backToTop.classList.remove("hidden");
  else backToTop.classList.add("hidden");
}
