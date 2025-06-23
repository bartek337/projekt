// ankieta2.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".ankieta-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dostepnosc = document.querySelector('input[name="dostepnosc"]:checked')?.value;
    const obsluga = document.querySelector('input[name="obsluga"]:checked')?.value;
    const usprawnienia = Array.from(document.querySelectorAll('input[name="usprawnienia"]:checked')).map(el => el.value);
    const uwagi = document.querySelector('textarea[name="uwagi"]').value;

    fetch("http://localhost:5000/api/ankiety/ocena", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dostepnosc, obsluga, usprawnienia, uwagi })
    })
    .then(res => res.json())
    .then(data => {
      alert("Dziękujemy za Twoją opinię!");
      form.reset();
    })
    .catch(err => {
      console.error("Błąd:", err);
      alert("Wystąpił błąd podczas wysyłania formularza.");
    });
  });
});
