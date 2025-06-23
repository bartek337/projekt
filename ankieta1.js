document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("loggedUser");
  const info = document.getElementById("userInfo");
  const loginBtn = document.getElementById("loginBtn");

  if (user && info && loginBtn) {
    info.innerText = `👤 ${user}`;
    loginBtn.innerText = "Wyloguj";
    loginBtn.href = "#";
    loginBtn.onclick = () => {
      localStorage.removeItem("loggedUser");
      location.reload();
    };
  }

  
  const form = document.querySelector(".ankieta-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inwestycja = document.querySelector('input[name="inwestycja"]:checked')?.value;
    const dzialania = Array.from(document.querySelectorAll('input[name="dzialania"]:checked')).map(el => el.value);

    fetch("http://localhost:5000/api/ankiety/inwestycje", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inwestycja, dzialania })
    })
      .then(res => {
        if (!res.ok) throw new Error("Błąd serwera");
        return res.json();
      })
      .then(() => {
        alert("✅ Dziękujemy za udział w ankiecie!");
        window.location.href = "ankiety.html";  
        })
      .catch(err => alert("Wystąpił błąd: " + err.message));
  });
});
