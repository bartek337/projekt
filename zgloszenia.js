document.addEventListener("DOMContentLoaded", () => {
  fetch("zgloszenia.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("zgloszenia-lista");
      const moje = data.filter(z => z.autor === loggedUser);

      if (moje.length === 0) {
        container.innerHTML = "<p>Nie masz jeszcze żadnych zgłoszeń.</p>";
        return;
      }

      moje.forEach(z => {
        const div = document.createElement("div");
        div.className = "zgloszenie-box";
        div.innerHTML = `
          <h4>${z.tytul}</h4>
          <p><strong>Data:</strong> ${z.data}</p>
          <p><strong>Opis:</strong> ${z.opis}</p>
          <p class="status ${z.status}">Status: ${formatStatus(z.status)}</p>
        `;
        container.appendChild(div);
      });
    });

  function formatStatus(st) {
    switch (st) {
      case "oczekuje": return "Oczekuje na rozpatrzenie";
      case "przyjete": return "Przyjęte do realizacji";
      case "rozpatrzone": return "Rozpatrzone";
      default: return st;
    }
  }
});
