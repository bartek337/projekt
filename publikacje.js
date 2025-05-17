function filterPub(category) {
    const cards = document.querySelectorAll('.pub-card');
    const buttons = document.querySelectorAll('.filters button');
  
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.filters button[onclick*="${category}"]`).classList.add('active');
  
    cards.forEach(card => {
      if (category === 'all' || card.classList.contains(category)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }
  
  function openGallery() {
    document.getElementById("galleryModal").classList.remove("hidden");
  }
  
  function closeGallery() {
    document.getElementById("galleryModal").classList.add("hidden");
  }
  