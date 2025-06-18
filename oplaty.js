document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("rachunki-lista");
  const login = localStorage.getItem("loggedUser");
  let rachunki = JSON.parse(localStorage.getItem("rachunki")) || [];

  if (!login) {
    lista.innerHTML = "<p class='alert-login'>Musisz być zalogowany, aby zobaczyć swoje rachunki.</p>";
    return;
  }

  const moje = rachunki.filter(r => r.login === login);

  if (moje.length === 0) {
    lista.innerHTML = "<p>Nie masz przypisanych żadnych rachunków.</p>";
    return;
  }

  moje.forEach((r, index) => {
    const div = document.createElement("div");
    div.className = `zgloszenie-box status-${r.status}`;

    div.innerHTML = `
    <h4>💰 Rachunek nr ${index + 1}</h4>
    <p><strong>💵 Kwota:</strong> <span>${r.kwota} PLN</span></p>
    <p><strong>📝 Opis:</strong> <span>${r.opis}</span></p>
    <p><strong>📌 Status:</strong> <span class="status ${r.status}">${r.status}</span></p>
    `;

    
    if (r.status === "oczekuje") {
      const btn = document.createElement("button");
      btn.textContent = "💳 Opłać";
      btn.className = "toggle-btn";
      btn.onclick = () => {
        r.status = "oplacone";
        localStorage.setItem("rachunki", JSON.stringify(rachunki));
        location.reload(); 
      };
      div.appendChild(btn);
    }

    lista.appendChild(div);
  });
});
