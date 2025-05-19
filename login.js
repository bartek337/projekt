function loginUser(event) {
  event.preventDefault();

  const login = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Przykładowi użytkownicy
  const users = {
    "admin": {
      haslo: "admin123",
      redirect: "admin-panel.html"
    },
    "jan.kowalski": {
      haslo: "1234",
      redirect: "moje_zgloszenia.html"
    },
    "anna.nowak": {
      haslo: "5678",
      redirect: "moje_zgloszenia.html"
    }
  };

  const user = users[login];

  if (user && user.haslo === password) {
    // Zapis loginu do localStorage
    localStorage.setItem("loggedUser", login);
    window.location.href = user.redirect;
  } else {
    alert("Nieprawidłowy login lub hasło!");
  }

  return false;
}
