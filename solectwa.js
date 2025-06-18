fetch("solectwa.json")
  .then((response) => response.json())
  .then((solectwa) => {
    const container = document.getElementById("solectwa-lista");

  
    solectwa.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "col";
      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Sołectwo ${item.nazwa}</h5>
            <p class="card-text">Sołtys: ${item.soltys}</p>
            <button class="details-btn" data-index="${index}">Zobacz szczegóły</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });


    const mapa = L.map('mapa-solectw').setView([52.07, 22.55], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(mapa);


    solectwa.forEach((item) => {
      if (item.lat && item.lng) {
        const marker = L.marker([item.lat, item.lng]).addTo(mapa);
        const popupContent = `
          <strong>${item.nazwa}</strong><br>
          Sołtys: ${item.soltys}<br>
          <a href="${item.link}" target="_blank">Zobacz szczegóły</a>
        `;
        marker.bindPopup(popupContent);
        marker.on("mouseover", () => marker.openPopup());
        marker.on("mouseout", () => marker.closePopup());
      }
    });


    const modal = document.getElementById("solectwo-modal");
    const modalBody = document.getElementById("modal-body");
    const closeBtn = document.querySelector(".close-btn");

    document.querySelectorAll(".details-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        const solectwo = solectwa[index];

        if (!solectwo) return;

        modalBody.innerHTML = `
        <div class="modal-row">
          <img src="${solectwo.obraz}" alt="Zdjęcie ${solectwo.nazwa}" class="modal-img" />
          <div class="modal-tekst">
            <h3>${solectwo.nazwa}</h3>
            <p><strong>Sołtys:</strong> ${solectwo.soltys}</p>
            <p><strong>Link:</strong> <a href="${solectwo.link}" target="_blank">${solectwo.link}</a></p>
          </div>
        </div>
      `;

        modal.classList.remove("hidden");
      });
    });

 
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
      });
    }

    
    modal.addEventListener("click", (e) => {
      const modalContent = document.querySelector(".modal-content");
      if (!modalContent.contains(e.target)) {
        modal.classList.add("hidden");
      }
    });
  })
  .catch((error) => {
    console.error("Błąd ładowania sołectw:", error);
  });