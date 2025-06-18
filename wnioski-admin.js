document.addEventListener("DOMContentLoaded", () => {
  const listaEl = document.getElementById("wnioskiLista");
  let wnioski = [];

  // POBIERANIE WNIOSKÓW Z BACKENDU
  fetch("http://localhost:5000/api/wnioski")
    .then(res => res.json())
    .then(data => {
      wnioski = data;
      renderujWnioski();
    });

  function renderujWnioski() {
  listaEl.innerHTML = "";

  const grupy = {
    "oczekuje": [],
    "przyjete": [],
    "odrzucone": []
  };

  wnioski.forEach(w => {
    if (grupy[w.status]) grupy[w.status].push(w);
  });

  const kolejnosc = ["oczekuje", "przyjete", "odrzucone"];
  const naglowki = {
    "oczekuje": "🕐 Wnioski oczekujące",
    "przyjete": "✅ Przyjęte",
    "odrzucone": "❌ Odrzucone"
  };

  kolejnosc.forEach(status => {
    if (grupy[status].length > 0) {
      const h3 = document.createElement("h3");
      h3.innerText = naglowki[status];
      listaEl.appendChild(h3);

      grupy[status].sort((a, b) => parseInt(b.id) - parseInt(a.id));

      grupy[status].forEach(w => {
        const div = document.createElement("div");

        let statusClass = "";
        if (w.status === "przyjete") statusClass = "wniosek-przyjete";
        else if (w.status === "odrzucone") statusClass = "wniosek-odrzucone";
        else statusClass = "wniosek-oczekuje";

        div.className = `wniosek-card ${statusClass}`;
        div.innerHTML = `
          <p><strong>Wniosek nr ${w.id}</strong> – ${w.typ}</p>
          <p><strong>Od:</strong> ${w.email ?? "Nieznany nadawca"}</p>
          <p>${w.opis.replace(/\n/g, "<br>")}</p>
          <p>Status: <strong>${w.status}</strong></p>
          <div class="wniosek-actions">
            ${
              w.status === "oczekuje"
                ? `
                <button class="btn-accept" onclick="zmienStatus('${w.id}', 'przyjete')">Przyjmij</button>
                <button class="btn-reject" onclick="zmienStatus('${w.id}', 'odrzucone')">Odrzuć</button>
                `
                : `
                <button class="btn-reject" onclick="zmienStatus('${w.id}', 'oczekuje')">Cofnij decyzję</button>
                `
            }
          </div>
        `;
        listaEl.appendChild(div);
      });
    }
  });
}


  // FUNKCJA ZMIANY STATUSU – wysyła PATCH do backendu
  window.zmienStatus = function(id, nowyStatus) {
    const potwierdzenie = confirm(`Czy na pewno chcesz ustawić status: "${nowyStatus}"?`);
    if (!potwierdzenie) return;

    fetch(`http://localhost:5000/api/wnioski/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: nowyStatus }),
    })
      .then(res => res.json())
      .then(() => {
        return fetch("http://localhost:5000/api/wnioski");
      })
      .then(res => res.json())
      .then(data => {
        wnioski = data;
        renderujWnioski();
      });
  };
});
