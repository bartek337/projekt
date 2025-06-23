document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("stat-wnioski").textContent = 27;
  document.getElementById("stat-uzytkownicy").textContent = 123;
  document.getElementById("stat-komunikaty").textContent = 8;

  
  zaladujWyniki();
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

function zaladujWyniki() {
  
  fetch("http://localhost:5000/api/ankiety/inwestycje")
    .then(res => res.json())
    .then(data => {
      const ul = document.getElementById("lista-ankieta1");
      ul.innerHTML = "";
      if (data.length === 0) {
        ul.innerHTML = "<li>Brak odpowiedzi.</li>";
        return;
      }
      data.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `Główna inwestycja: ${entry.inwestycja}, Dodatkowe działania: ${entry.dzialania?.join(", ") || "brak"}`;
        ul.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Błąd przy pobieraniu ankiety inwestycyjnej:", err);
    });

  
  fetch("http://localhost:5000/api/ankiety/ocena")
    .then(res => res.json())
    .then(data => {
      const ul = document.getElementById("lista-ankieta2");
      ul.innerHTML = "";
      if (data.length === 0) {
        ul.innerHTML = "<li>Brak odpowiedzi.</li>";
        return;
      }
      data.forEach(entry => {
        const li = document.createElement("li");
        li.innerHTML = `
          Dostępność: ${entry.dostepnosc || "brak"}, 
          Obsługa: ${entry.obsluga || "brak"}, 
          Usprawnienia: ${entry.usprawnienia?.join(", ") || "brak"}<br>
          Uwagi: ${entry.uwagi || "brak"}
        `;
        ul.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Błąd przy pobieraniu ankiety oceny urzędu:", err);
    });
}
