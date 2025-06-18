document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("zgloszenia-lista");
  const email = localStorage.getItem("loggedUser");

  if (!email) {
    lista.innerHTML = "<p class='alert-login'>Musisz być zalogowany, aby zobaczyć swoje zgłoszenia.</p>";
    return;
  }

  fetch("http://localhost:5000/api/wnioski")
    .then(res => res.json())
    .then(data => {
      const moje = data.filter(w => w.email === email);

      if (moje.length === 0) {
        lista.innerHTML = "<p>Nie masz jeszcze żadnych zgłoszeń.</p>";
        return;
      }

      const grupy = {
        "oczekuje": [],
        "przyjete": [],
        "odrzucone": []
      };

      moje.forEach(w => {
        if (grupy[w.status]) grupy[w.status].push(w);
      });

      const naglowki = {
        "oczekuje": "🕐 Wnioski oczekujące",
        "przyjete": "✅ Wnioski przyjęte",
        "odrzucone": "❌ Wnioski odrzucone"
      };

      const kolejnosc = ["oczekuje", "przyjete", "odrzucone"];

      kolejnosc.forEach(status => {
        const wnioskiStatusu = grupy[status];
        if (wnioskiStatusu.length > 0) {
          const h3 = document.createElement("h3");
          h3.textContent = naglowki[status];
          lista.appendChild(h3);

     
          wnioskiStatusu.sort((a, b) => parseInt(b.id) - parseInt(a.id));

          wnioskiStatusu.forEach(w => {
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
        }
      });
    });
});
