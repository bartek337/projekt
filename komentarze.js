document.addEventListener("DOMContentLoaded", () => {
  const slug = window.location.pathname.split('/').pop().replace('.html', '');
  const komentarzeDiv = document.querySelector('.komentarze');
  const dodajKomentarzDiv = komentarzeDiv.querySelector('.dodaj-komentarz');

  const user = localStorage.getItem("loggedUser");

  
  if (user) {
    dodajKomentarzDiv.insertAdjacentHTML('beforeend', `
      <form id="komentarz-form">
        <textarea name="tresc" placeholder="Napisz swój komentarz..." required class="form-control mb-2"></textarea>
        <button type="submit" class="btn btn-primary">Wyślij</button>
      </form>
    `);
  } else {
    dodajKomentarzDiv.insertAdjacentHTML('beforeend', `
      <div class="alert alert-warning">
        Aby dodać komentarz, <a href="login.html">zaloguj się</a>.
      </div>
    `);
  }

  
  fetch(`http://localhost:5000/api/komentarze/${slug}`)
    .then(res => res.json())
    .then(data => {
      data.forEach(k => {
        komentarzeDiv.insertAdjacentHTML('beforeend', `
          <div class="komentarz">
            <div class="komentarz-header">
              <span class="autor">${k.autor}</span>
              <span class="data">${k.data}</span>
            </div>
            <p>${k.tresc}</p>
          </div>
        `);
      });
    });

  
  document.getElementById('komentarz-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const tresc = e.target.tresc.value.trim();
    if (!tresc) return;

    fetch(`http://localhost:5000/api/komentarze/${slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        autor: user,
        tresc: tresc,
        data: new Date().toISOString().split('T')[0]
      })
    })
    .then(res => res.json())
    .then(() => {
      location.reload(); 
    });
  });
});
