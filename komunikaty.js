document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const tytulInput = document.getElementById("tytul");
  const trescInput = document.getElementById("tresc");
  const listaDiv = document.getElementById("lista-komunikatow");

  let komunikaty = JSON.parse(localStorage.getItem("komunikaty")) || [];

  function zapiszKomunikaty() {
    localStorage.setItem("komunikaty", JSON.stringify(komunikaty));
  }

  function odswiezListe() {
    listaDiv.innerHTML = "";

    if (komunikaty.length === 0) {
      listaDiv.innerHTML = "<p>Brak opublikowanych komunikatów.</p>";
      return;
    }

    komunikaty.forEach((k, index) => {
      const div = document.createElement("div");
      div.className = "komunikat-card";
      div.innerHTML = `
        <h4>${k.tytul}</h4>
        <p>${k.tresc}</p>
        <p class="meta">📅 ${k.data} | 👤 ${k.autor}</p>
        <div class="admin-buttons">
          <button class="btn-edytuj">✏️ Edytuj</button>
          <button class="btn-usun">🗑️ Usuń</button>
        </div>
      `;

      div.querySelector(".btn-usun").onclick = () => {
        if (confirm("Czy na pewno usunąć ten komunikat?")) {
          komunikaty.splice(index, 1);
          zapiszKomunikaty();
          odswiezListe();
        }
      };

      div.querySelector(".btn-edytuj").onclick = () => {
        const nowyTytul = prompt("Nowy tytuł:", k.tytul);
        const nowaTresc = prompt("Nowa treść:", k.tresc);
        if (nowyTytul && nowaTresc) {
          komunikaty[index].tytul = nowyTytul;
          komunikaty[index].tresc = nowaTresc;
          zapiszKomunikaty();
          odswiezListe();
        }
      };

      listaDiv.appendChild(div);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    const nowy = {
      autor: "admin",
      tytul: tytulInput.value.trim(),
      tresc: trescInput.value.trim(),
      data: new Date().toISOString().split("T")[0]
    };

    komunikaty.unshift(nowy);
    zapiszKomunikaty();
    form.reset();
    odswiezListe();
  });

  odswiezListe();
});
