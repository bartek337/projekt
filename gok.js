document.addEventListener("DOMContentLoaded", () => {
  const sliderImages = [
    {
        src: "gok1.jpg",
        caption: "Obchody XXII Tygodnia Bibliotek"
    },
    {
        src: "gok2.jpg",
        caption: "Wycieczka Klubu Seniora 'Senior na Topie' do Zakopanego"
    },
    {
        src: "gok3.jpg",
        caption: "Spotkanie przedszkolaków z historią"
    },
    {
        src: "gok4.jpg",
        caption: "Rajd pieszy dla najmłodszych z okazji obchodów święta 3 Maja"
    },
    {
        src: "gok5.jpg",
        caption: "Warsztaty wielkanocne prowadzone wśród najmłodszych mieszkańców"
    }
   ];
  let current = 0;
  const img = document.getElementById("slider-img");
  const caption = document.getElementById("slider-caption");

  if (!img || !caption) {
    console.warn("Slider: brak elementów img lub caption!");
    return;
  }

  function updateSlider() {
    img.style.opacity = 0;
    caption.style.opacity = 0;

    setTimeout(() => {
      img.src = sliderImages[current].src;
      caption.textContent = sliderImages[current].caption;
      img.style.opacity = 1;
      caption.style.opacity = 1;
    }, 300);
  }

 
  updateSlider();

  setInterval(() => {
    current = (current + 1) % sliderImages.length;
    updateSlider();
  }, 5000);
});
