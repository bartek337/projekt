document.addEventListener("DOMContentLoaded", () => {
  fetch("dane.json")
    .then(res => res.json())
    .then(data => {
      document.getElementById("stat-wnioski").textContent = data.wnioski;
      document.getElementById("stat-uzytkownicy").textContent = data.uzytkownicy;
      document.getElementById("stat-komunikaty").textContent = data.komunikaty;
    })
    .catch(err => {
      console.error("Błąd ładowania danych:", err);
    });
});
