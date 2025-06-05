document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reportForm");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const typ = document.getElementById("type").value;
      const lokalizacja = document.getElementById("location").value;
      const temat = document.getElementById("subject").value;
      const opis = document.getElementById("description").value;
      const email = localStorage.getItem("loggedUser");

      const pelnyOpis = `📍 ${lokalizacja} — ${temat}\n\n${opis}`;

      fetch("http://localhost:5000/api/wnioski", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typ: typ,
          opis: pelnyOpis,
          email: email // ⬅ przypisanie do zgłoszenia
        })
      })
        .then(res => {
          if (!res.ok) throw new Error("Błąd podczas wysyłania zgłoszenia.");
          return res.json();
        })
        .then(data => {
          alert("✅ Zgłoszenie wysłane!");
          form.reset();
          document.getElementById("additionalFields").style.display = "none";
        })
        .catch(err => {
          alert("❌ Wystąpił problem: " + err.message);
        });
    });
  }
});
