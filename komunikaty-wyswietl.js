document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("komunikaty-lista");
  const komunikaty = JSON.parse(localStorage.getItem("komunikaty")) || [];

  if (komunikaty.length === 0) {
    lista.innerHTML = "<p>Brak aktualnych komunikatów.</p>";
    return;
  }

  komunikaty.forEach(k => {
    const div = document.createElement("div");
    div.className = "komunikat-card";
    div.innerHTML = `
    <h4>📌 ${k.tytul}</h4>
    <p>${k.tresc}</p>
    <div class="komunikat-meta">
        <span><i class="fa fa-calendar"></i> ${k.data}</span>
        <span><i class="fa fa-user"></i> ${k.autor}</span>
    </div>
    `;
    lista.appendChild(div);
  });
});
