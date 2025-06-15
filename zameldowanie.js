document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-panel");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const imie = document.getElementById("imie").value.trim();
      const nazwisko = document.getElementById("nazwisko").value.trim();
      const adres = document.getElementById("adres").value.trim();

      const email = localStorage.getItem("loggedUser");

      if (!email) {
        alert("Musisz być zalogowany, aby wysłać wniosek.");
        return;
      }

      if (!imie || !nazwisko || !adres) {
        alert("Wypełnij wszystkie pola!");
        return;
      }

      const opis = `👤 ${imie} ${nazwisko}\n🏠 Nowy adres: ${adres}`;

      try {
        const response = await fetch("http://localhost:5000/api/wnioski", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            typ: "zameldowanie",
            opis: opis,
            email: email
          }),
        });

        if (!response.ok) throw new Error("Błąd podczas wysyłania wniosku.");

        const data = await response.json();
        alert("✅ Wniosek został wysłany! ID: " + data.id);
        form.reset();
      } catch (error) {
        alert("❌ Wystąpił problem: " + error.message);
      }
    });
  }
});
