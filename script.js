/*script.js*/
document.addEventListener("DOMContentLoaded", () => {
  let agbModalStart = 0;
  let datenschutzModalStart = 0;

  // Checkboxen & Button
  const datenschutzCheckbox = document.getElementById("datenschutzCheck");
  const agbCheckbox = document.getElementById("agbCheck");
  const startBtn = document.getElementById("startBtn");

  // Links & Modals
  const openDatenschutzLink = document.getElementById("openDatenschutz");
  const datenschutzModal = document.getElementById("datenschutzModal");
  const closeDatenschutzModal = document.getElementById("closeDatenschutzModal");

  const openAGBLink = document.getElementById("openAGB");
  const agbModal = document.getElementById("agbModal");
  const closeAGBModal = document.getElementById("closeAGBModal");

  // Button aktivieren, wenn beide Checkboxen gesetzt sind
  function updateStartButtonState() {
    startBtn.disabled = !(datenschutzCheckbox.checked && agbCheckbox.checked);
  }

  datenschutzCheckbox.addEventListener("change", updateStartButtonState);
  agbCheckbox.addEventListener("change", updateStartButtonState);

  // Datenschutz Modal öffnen
  openDatenschutzLink.addEventListener("click", (e) => {
    e.preventDefault();
    datenschutzModal.classList.remove("hidden");
    datenschutzModalStart = Date.now();
  });

  // Datenschutz Modal schließen
closeDatenschutzModal.addEventListener("click", () => {
  datenschutzModal.classList.add("hidden");
  
  if(datenschutzModalStart > 0){
    const timeSpent = ((Date.now() - datenschutzModalStart) / 1000).toFixed(2);
    
    const daten = JSON.parse(localStorage.getItem("uniQuizDaten")) || {};
    daten.datenschutzGelesen = true;
    daten.datenschutzVerweildauer = parseFloat(timeSpent);
    daten.datenschutzAkzeptiertAm = new Date().toISOString();
    localStorage.setItem("uniQuizDaten", JSON.stringify(daten));

    datenschutzModalStart = 0;
  }
  
});
  
  // AGB Modal öffnen
  openAGBLink.addEventListener("click", (e) => {
    e.preventDefault();
    agbModal.classList.remove("hidden");
    agbModalStart = Date.now();
  });

  // AGB Modal schließen
closeAGBModal.addEventListener("click", () => {
  agbModal.classList.add("hidden");
  
  if(agbModalStart > 0){
    const timeSpent = ((Date.now() - agbModalStart) / 1000).toFixed(2);
  
    const daten = JSON.parse(localStorage.getItem("uniQuizDaten")) || {};
    daten.agbGelesen = true;
    daten.agbVerweildauer = parseFloat(timeSpent);
    daten.agbAkzeptiertAm = new Date().toISOString();
    localStorage.setItem("uniQuizDaten", JSON.stringify(daten));

    agbModalStart = 0;
  }
  
});
  
  // Quiz starten
  // Pseudonym validieren und speichern bei Formular-Abschicken
  const quizForm = document.getElementById("quizForm");
  const kuerzelInput = document.getElementById("kuerzel");
  const kuerzelFehler = document.getElementById("kuerzelFehler");

  quizForm.addEventListener("submit", (e) => {
    e.preventDefault(); // verhindert das automatische Abschicken
    const kuerzel = kuerzelInput.value.trim();


    const daten = JSON.parse(localStorage.getItem("uniQuizDaten")) || {};
    daten.kuerzel = kuerzel;
    daten.pseudonymGespeichertAm = new Date().toISOString();
    localStorage.setItem("uniQuizDaten", JSON.stringify(daten));

    // Weiterleitung zum Quiz
    window.location.href = "quiz.html";
  });
});
