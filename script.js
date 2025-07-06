//script.js
// Zeitmesser für Verweildauer
let datenschutzStart = 0;
let agbStart = 0;

// Elementreferenzen
const datenschutzCheckbox = document.getElementById("datenschutzCheck");
const agbCheckbox = document.getElementById("agbCheck");
const startBtn = document.getElementById("startBtn");
const pseudonymInput = document.getElementById("pseudonym");

const openDatenschutzLink = document.getElementById("openDatenschutz");
const datenschutzModal = document.getElementById("datenschutzModal");
const closeDatenschutzModal = document.getElementById("closeModal");

const openAGBLink = document.getElementById("openAGB");
const agbModal = document.getElementById("agbModal");
const closeAGBModal = document.getElementById("closeAGBModal");

// Startbutton nur aktivieren, wenn AGB, Datenschutz & Pseudonym erfüllt sind
function updateStartButtonState() {
  const pseudonym = pseudonymInput.value.trim();
  startBtn.disabled = !(datenschutzCheckbox.checked && agbCheckbox.checked && pseudonym.length > 0);
}

// Eventlistener für Checkboxen und Pseudonym
datenschutzCheckbox.addEventListener("change", updateStartButtonState);
agbCheckbox.addEventListener("change", updateStartButtonState);
pseudonymInput.addEventListener("input", updateStartButtonState);

// Datenschutz Modal öffnen
openDatenschutzLink.addEventListener("click", (e) => {
  e.preventDefault();
  datenschutzModal.classList.remove("hidden");
  datenschutzStart = Date.now();
});

// Datenschutz Modal schließen + Zeit speichern
closeDatenschutzModal.addEventListener("click", () => {
  datenschutzModal.classList.add("hidden");
  const timeSpent = ((Date.now() - datenschutzStart) / 1000).toFixed(2);
  console.log("Datenschutzerklärung geöffnet für:", timeSpent, "Sekunden");

  let daten = JSON.parse(localStorage.getItem("uniQuizDaten")) || {};
  daten.datenschutzVerweildauer = parseFloat(timeSpent);
  daten.datenschutzGelesen = true;
  localStorage.setItem("uniQuizDaten", JSON.stringify(daten));
});

// AGB Modal öffnen
openAGBLink.addEventListener("click", (e) => {
  e.preventDefault();
  agbModal.classList.remove("hidden");
  agbStart = Date.now();
});

// AGB Modal schließen + Zeit speichern
closeAGBModal.addEventListener("click", () => {
  agbModal.classList.add("hidden");
  const timeSpent = ((Date.now() - agbStart) / 1000).toFixed(2);
  console.log("AGB geöffnet für:", timeSpent, "Sekunden");

  let daten = JSON.parse(localStorage.getItem("uniQuizDaten")) || {};
  daten.agbVerweildauer = parseFloat(timeSpent);
  daten.agbGelesen = true;
  localStorage.setItem("uniQuizDaten", JSON.stringify(daten));
});

// Quiz starten
startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const pseudonym = pseudonymInput.value.trim();

  if (!pseudonym) {
    alert("Bitte gib ein Pseudonym ein.");
    return;
  }

  let daten = JSON.parse(localStorage.getItem("uniQuizDaten")) || {};
  daten.pseudonym = pseudonym;
  daten.agbAkzeptiertAm = new Date().toISOString();
  daten.datenschutzAkzeptiertAm = new Date().toISOString();
  localStorage.setItem("uniQuizDaten", JSON.stringify(daten));

  window.location.href = "quiz.html";
});
