window.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([51.9, 22.4], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(map);
  
    // Ikony dla atrakcji
    const icon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/235/235861.png',
      iconSize: [32, 37],
      iconAnchor: [16, 37],
      popupAnchor: [0, -28]
    });
  
    const attractions = [
      {
        name: "Zalew Zimna Woda",
        latlng: [51.91, 22.39],
        icon: icon,
        description: "Popularny zbiornik wodny na wypoczynek."
      },
      {
        name: "Muzeum im. Henryka Sienkiewicza w Woli Okrzejskiej",
        latlng: [51.87, 22.45],
        icon: icon,
        description: "Muzeum poświęcone życiu i twórczości noblisty."
      },
      {
        name: "Muzeum w Łukowie",
        latlng: [51.93, 22.37],
        icon: icon,
        description: "Lokalne muzeum prezentujące historię miasta."
      },
      {
        name: 'Park Przyrody "Jata"',
        latlng: [51.89, 22.41],
        icon: icon,
        description: "Piękny park przyrody z licznymi szlakami."
      }
    ];
  
    attractions.forEach(attraction => {
      L.marker(attraction.latlng, { icon: attraction.icon })
        .addTo(map)
        .bindPopup(`<b>${attraction.name}</b><br>${attraction.description}`);
    });
  
    const infoBox = document.getElementById('info');
    const progressContainer = document.getElementById('progress-container');
    const progressIndicator = document.getElementById('progress-indicator');
    let marker = null;
    let points = [];
  
    const gpx = new L.GPX('szlak-lukowski.gpx', {
      async: true,
      marker_options: {
        startIconUrl: 'https://unpkg.com/leaflet-gpx@1.5.0/pin-icon-start.png',
        endIconUrl: 'https://unpkg.com/leaflet-gpx@1.5.0/pin-icon-end.png',
        shadowUrl: 'https://unpkg.com/leaflet-gpx@1.5.0/pin-shadow.png'
      },
      polyline_options: {
        color: 'darkred',
        weight: 5,
        opacity: 0.8
      }
    }).on('addline', function(e) {
      points = e.line.getLatLngs();
    }).on('loaded', function(e) {
      const gpxLayer = e.target;
      map.fitBounds(gpxLayer.getBounds());
  
      const totalDist = gpxLayer.get_distance();
      const totalTime = totalDist / 5000;
  
      infoBox.innerHTML = `
        <b>Całkowity dystans:</b> ${(totalDist / 1000).toFixed(2)} km<br>
        <b>Szacowany czas przejścia:</b> ${totalTime.toFixed(2)} godz.
        <br><br><i>Najeżdżaj kursorem na pasek poniżej, aby zobaczyć postęp na trasie.</i>
      `;
    }).addTo(map);
  
    progressContainer.addEventListener('mousemove', function(e) {
      if (points.length === 0) return;
  
      const rect = progressContainer.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const index = Math.floor(percent * points.length);
  
      if (index < 0 || index >= points.length) return;
  
      const latlng = points[index];
  
      if (!marker) {
        marker = L.marker(latlng).addTo(map);
      } else {
        marker.setLatLng(latlng);
      }
  
      progressIndicator.style.left = `${percent * 100}%`;
  
      let dist = 0;
      for (let i = 1; i <= index; i++) {
        dist += points[i - 1].distanceTo(points[i]);
      }
      const time = dist / 5000;
  
      infoBox.innerHTML = `
        <b>Przebyto:</b> ${(dist / 1000).toFixed(2)} km<br>
        <b>Szacowany czas:</b> ${time.toFixed(2)} godz.
      `;
    });
  
    progressContainer.addEventListener('mouseleave', function() {
      if (marker) {
        map.removeLayer(marker);
        marker = null;
      }
  
      progressIndicator.style.left = '-100px';
  
      infoBox.innerHTML = `
        <i>Najeżdżaj kursorem na pasek poniżej, aby zobaczyć postęp na trasie.</i>
      `;
    });
  });