document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("zgloszenia-lista");
  const email = localStorage.getItem("loggedUser");

  console.log("✅ Zalogowany:", email); // DEBUG
  if (!email) {
    lista.innerHTML = "<p class='alert-login'>Musisz być zalogowany, aby zobaczyć swoje zgłoszenia.</p>";
    return;
  }

  fetch("http://localhost:5000/api/wnioski")
    .then(res => res.json())
    .then(data => {
      console.log("✅ Otrzymane wnioski:", data); // DEBUG

      const moje = data.filter(w => w.email === email);
      console.log("✅ Moje wnioski:", moje); // DEBUG

      if (moje.length === 0) {
        lista.innerHTML = "<p>Nie masz jeszcze żadnych zgłoszeń.</p>";
        return;
      }

      moje.forEach(w => {
        const div = document.createElement("div");
        const statusClass = `status-${w.status}`; 
        div.className = `zgloszenie-box status-box ${statusClass}`;

        div.innerHTML = `
          <h4>${w.typ} – zgłoszenie nr ${w.id}</h4>
          <p>${w.opis.replace(/\n/g, "<br>")}</p>
          <p class="status ${w.status}">Status: ${w.status}</p>
        `;
        lista.appendChild(div);
      });
    });
});
