document.addEventListener("DOMContentLoaded", () => {
  const listaEl = document.getElementById("wnioskiLista");

  if (!localStorage.getItem("wnioski")) {
    const przykladowe = [
      {
        id: "001",
        typ: "Naprawa drogi",
        opis: "W drodze do szkoły są dziury",
        status: "oczekuje"
      },
      {
        id: "002",
        typ: "Brak oświetlenia",
        opis: "Latarnia przy ul. Lipowej 10 nie działa",
        status: "oczekuje"
      }
    ];
    localStorage.setItem("wnioski", JSON.stringify(przykladowe));
  }

  let wnioski = JSON.parse(localStorage.getItem("wnioski"));

  const nowyWniosekId = "003";
  if (!wnioski.some(w => w.id === nowyWniosekId)) {
    wnioski.push({
      id: nowyWniosekId,
      typ: "Awaria kanalizacji",
      opis: "Zgłoszenie zalania piwnicy przy ul. Klonowej 12.",
      status: "oczekuje"
    });
    localStorage.setItem("wnioski", JSON.stringify(wnioski));
  }

  function renderujWnioski() {
    listaEl.innerHTML = "";
    wnioski.forEach((w, index) => {
      const div = document.createElement("div");

      let statusClass = "";
      if (w.status === "przyjete") statusClass = "wniosek-przyjete";
      else if (w.status === "odrzucone") statusClass = "wniosek-odrzucone";
      else statusClass = "wniosek-oczekuje";

      div.className = `wniosek-card ${statusClass}`;

      div.innerHTML = `
        <p><strong>Wniosek nr ${w.id}</strong> – ${w.typ}</p>
        <p>${w.opis}</p>
        <p>Status: <strong>${w.status}</strong></p>
        <div class="wniosek-actions">
          ${
            w.status === "oczekuje"
              ? `
              <button class="btn-accept" onclick="zmienStatus(${index}, 'przyjete')">Przyjmij</button>
              <button class="btn-reject" onclick="zmienStatus(${index}, 'odrzucone')">Odrzuć</button>
              `
              : `
              <button class="btn-reject" onclick="anulujStatus(${index})">Cofnij decyzję</button>
              `
          }
        </div>
      `;
      listaEl.appendChild(div);
    });
  }

  window.zmienStatus = function(index, nowyStatus) {
    const potwierdzenie = confirm(`Czy na pewno chcesz oznaczyć wniosek jako "${nowyStatus}"?`);
    if (!potwierdzenie) return;

    wnioski[index].status = nowyStatus;
    localStorage.setItem("wnioski", JSON.stringify(wnioski));
    renderujWnioski();
  };

  window.anulujStatus = function(index) {
    const potwierdzenie = confirm("Czy na pewno chcesz cofnąć decyzję i przywrócić status 'oczekuje'?");
    if (!potwierdzenie) return;

    wnioski[index].status = "oczekuje";
    localStorage.setItem("wnioski", JSON.stringify(wnioski));
    renderujWnioski();
  };

  renderujWnioski();
});