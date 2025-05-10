fetch("solectwa.json")
.then((response) => response.json())
.then((solectwa) => {
  const container = document.getElementById("solectwa-lista");

  // Tworzenie kafelków
  solectwa.forEach((item) => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">Sołectwo ${item.nazwa}</h5>
          <p class="card-text">Sołtys: ${item.soltys}</p>
          <a href="${item.link}" class="btn btn-primary">Zobacz szczegóły</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Wyświetlanie mapy
  const mapa = L.map('mapa-solectw').setView([52.07, 22.55], 11); // środek gminy

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 18,
  }).addTo(mapa);

  // Dodawanie pinezek
  solectwa.forEach((item) => {
    if (item.lat && item.lng) {
      const marker = L.marker([item.lat, item.lng]).addTo(mapa);
      marker.bindPopup(`
        <strong>${item.nazwa}</strong><br>
        <a href="${item.link}">Zobacz szczegóły</a>
      `);
      marker.bindPopup(`
        <strong>${item.nazwa}</strong><br>
        <a href="${item.link}">Zobacz szczegóły</a>
      `);
        }
  });
})
.catch((error) => {
  console.error("Błąd ładowania sołectw:", error);
});

  