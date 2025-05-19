const user = localStorage.getItem("loggedUser");
if (!user || user === "admin") {
  alert("Ta strona jest dostępna tylko dla zalogowanych mieszkańców.");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loggedUserDisplay").textContent = user;

  const issueForm = document.getElementById("issueForm");
  const issuesTable = document.querySelector("#issuesTable tbody");

  let allIssues = JSON.parse(localStorage.getItem("zgłoszenia")) || [];

  function showIssues() {
    issuesTable.innerHTML = "";
    const userIssues = allIssues.filter(i => i.login === user);
    userIssues.forEach(issue => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${issue.kategoria}</td>
        <td>${issue.opis}</td>
        <td>${issue.status}</td>
      `;
      issuesTable.appendChild(tr);
    });
  }

  issueForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    const newIssue = {
      login: user,
      kategoria: category,
      opis: description,
      status: "oczekuje"
    };

    allIssues.push(newIssue);
    localStorage.setItem("zgłoszenia", JSON.stringify(allIssues));
    issueForm.reset();
    showIssues();
  });

  showIssues();

});
function logout() {
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
}
