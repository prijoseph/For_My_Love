const $ = (selector) => document.querySelector(selector);
const toast = $("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

$("#menuToggle").addEventListener("click", () => {
  const nav = $("#nav");
  const isOpen = nav.classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", String(isOpen));
});
$("#nav").querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  $("#nav").classList.remove("open");
  $("#menuToggle").setAttribute("aria-expanded", "false");
}));

$("#openSurprise").addEventListener("click", () => {
  $("#letter").scrollIntoView({ behavior: "smooth" });
  showToast("This little letter is all yours, baby ♡");
  burstHearts(window.innerWidth * 0.52, window.innerHeight * 0.55, 12);
});

document.querySelectorAll(".reason-card").forEach(card => {
  card.addEventListener("click", () => {
    $("#reasonReveal").textContent = card.dataset.message;
    burstHearts(window.innerWidth / 2, window.innerHeight * 0.65, 5);
  });
});

$("#heartButton").addEventListener("click", () => {
  $("#finalNote").textContent = "A thousand hugs and a million kisses for you, baby Julie. ♡";
  burstHearts(window.innerWidth / 2, window.innerHeight * 0.65, 24);
  showToast("With All My Heart, Baby ♡");
});

function burstHearts(x, y, count) {
  const symbols = ["♡", "♥", "✧", "✿"];
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "heart-particle";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${x + (Math.random() - .5) * 110}px`;
    heart.style.top = `${y + (Math.random() - .5) * 30}px`;
    heart.style.fontSize = `${14 + Math.random() * 20}px`;
    heart.style.setProperty("--dx", `${(Math.random() - .5) * 130}px`);
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1900);
  }
}

// Browser audio must be started by a user gesture. Add assets/our-song.mp3 to enable music.
const audio = $("#backgroundMusic");
let musicReady = false;
$("#musicToggle").addEventListener("click", async () => {
  const source = audio.querySelector("source");
  if (!source) {
    showToast("Add your song as assets/our-song.mp3 to enable music ♫");
    return;
  }
  try {
    if (audio.paused) {
      await audio.play();
      $("#musicIcon").textContent = "Ⅱ";
      $("#musicLabel").textContent = "Pause our song";
    } else {
      audio.pause();
      $("#musicIcon").textContent = "♫";
      $("#musicLabel").textContent = "Play our song";
    }
  } catch {
    showToast("Your browser couldn't play the song. Try another MP3 file.");
  }
});
