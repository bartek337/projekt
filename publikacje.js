function filterPub(category) {
  const cards = document.querySelectorAll('.pub-card');
  const buttons = document.querySelectorAll('.filters button');

  buttons.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.filters button[onclick*="${category}"]`).classList.add('active');

  cards.forEach(card => {
    const match = category === 'all' || card.classList.contains(category);

    if (match) {
      card.classList.remove('fade-out');
      card.classList.add('fade-in');
    } else {
      card.classList.remove('fade-in');
      card.classList.add('fade-out');
    }
  });

  // przewinięcie do pierwszej dopasowanej karty
  const firstVisible = Array.from(cards).find(c => category === 'all' || c.classList.contains(category));
  if (firstVisible) {
    setTimeout(() => {
      firstVisible.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300); // czekamy chwilę na animację
  }
}
  function openGallery() {
    document.getElementById("galleryModal").classList.remove("hidden");
  }
  
  function closeGallery() {
    document.getElementById("galleryModal").classList.add("hidden");
  }
  