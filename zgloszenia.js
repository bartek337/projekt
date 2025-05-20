document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("loggedUser");
  const container = document.getElementById("zgloszenia-lista");

  if (!user) {
    container.innerHTML = "<p>Brak dostępu. Nie jesteś zalogowany.</p>";
    return;
  }

  const allIssues = JSON.parse(localStorage.getItem("zgłoszenia")) || [];

  const moje = allIssues.filter(z => z.login === user);

  if (moje.length === 0) {
    container.innerHTML = "<p>Nie masz jeszcze żadnych zgłoszeń.</p>";
    return;
  }

  moje.forEach(z => {
    const box = document.createElement("div");
    box.classList.add("zgloszenie-box");

    box.innerHTML = `
      <h4>${z.kategoria}</h4>
      <p><strong>Opis:</strong> ${z.opis}</p>
      <p><strong>Status:</strong> <span class="status ${z.status}">${formatStatus(z.status)}</span></p>
    `;

    container.appendChild(box);
  });

  function formatStatus(st) {
    switch (st) {
      case "oczekuje":
        return "Oczekuje na rozpatrzenie";
      case "przyjete":
        return "Przyjęte do realizacji";
      case "rozpatrzone":
        return "Rozpatrzone";
      default:
        return st;
    }
  }
});
