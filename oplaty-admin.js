document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("paymentForm");
  const table = document.getElementById("paymentTable");
  const selectLogin = document.getElementById("userLogin");

  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([
      { login: "jan.kowalski", imie: "Jan", nazwisko: "Kowalski" },
      { login: "anna.nowak", imie: "Anna", nazwisko: "Nowak" },
      { login: "admin", imie: "Admin", nazwisko: "System" }
    ]));
  }

  const users = JSON.parse(localStorage.getItem("users"));
  let rachunki = JSON.parse(localStorage.getItem("rachunki")) || [];

  
  users.forEach(user => {
    if (user.login !== "admin") {
      const option = document.createElement("option");
      option.value = user.login;
      option.textContent = `${user.login} (${user.imie} ${user.nazwisko})`;
      selectLogin.appendChild(option);
    }
  });


  function odswiezTabele() {
    table.innerHTML = "";
    rachunki.forEach(r => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${r.login}</td>
        <td>${r.kwota} PLN</td>
        <td>${r.opis}</td>
        <td><span class="status ${r.status}">${r.status}</span></td>
      `;
      table.appendChild(row);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    const nowy = {
      login: selectLogin.value,
      kwota: document.getElementById("amount").value,
      opis: document.getElementById("desc").value,
      status: "oczekuje"
    };

    rachunki.push(nowy);
    localStorage.setItem("rachunki", JSON.stringify(rachunki));
    form.reset();
    odswiezTabele();
  });

  odswiezTabele();
});
