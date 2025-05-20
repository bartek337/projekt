document.addEventListener("DOMContentLoaded", () => {
  // Przykładowe dane statystyk
  document.getElementById("stat-wnioski").textContent = 27;
  document.getElementById("stat-uzytkownicy").textContent = 123;
  document.getElementById("stat-komunikaty").textContent = 8;
});

function toggleWniosek(button) {
  const szczegoly = button.nextElementSibling;
  if (szczegoly.style.display === "block") {
    szczegoly.style.display = "none";
    button.textContent = "Pokaż szczegóły";
  } else {
    szczegoly.style.display = "block";
    button.textContent = "Ukryj szczegóły";
  }
}

function toggleUzytkownik(button) {
  const szczegoly = button.nextElementSibling;
  if (szczegoly.style.display === "block") {
    szczegoly.style.display = "none";
    button.textContent = "Pokaż szczegóły";
  } else {
    szczegoly.style.display = "block";
    button.textContent = "Ukryj szczegóły";
  }
}