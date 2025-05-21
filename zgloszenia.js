document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("zgloszenia-lista");


  const zgloszenia = [
    {
      login: "anna.kowalska",
      typ: "Brak oświetlenia",
      opis: "Nie działa latarnia przy ul. Leśnej 4",
      status: "oczekuje"
    },
    {
      login: "jan.nowak",
      typ: "Dziura w drodze",
      opis: "Duża wyrwa przy remizie OSP",
      status: "przyjete"
    },
    {
      login: "kasia.zielinska",
      typ: "Uszkodzony przystanek",
      opis: "Zbite szkło na przystanku przy szkole",
      status: "rozpatrzone"
    }
  ];

  zgloszenia.forEach((z, index) => {
    const box = document.createElement("div");
    box.className = "zgloszenie-box";
    box.innerHTML = `
      <h4>📄 Zgłoszenie #${index + 1}</h4>
      <p><strong>Typ:</strong> ${z.typ}</p>
      <p><strong>Opis:</strong> ${z.opis}</p>
      <p><strong>Status:</strong> <span class="status ${z.status}">${z.status}</span></p>
      <p><strong>Użytkownik:</strong> ${z.login}</p>
    `;
    lista.appendChild(box);
  });
});
