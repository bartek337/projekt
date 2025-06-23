
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

});
