import React from 'react';
import '../App.css';

// Génération de 20 images de tailles aléatoires pour l'exemple
const images = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  // On varie les hauteurs entre 200 et 400 pour l'effet Masonry
  url: `https://picsum.photos/200/${200 + (i % 4) * 50}?random=${i}`,
  alt: `Image ${i}`
}));

function App() {
  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>Ma Galerie ({images.length} photos)</h2>
      
      <div className="gallery-container">
        {images.map((img, index) => (
          <div 
            key={img.id} 
            className="image-wrapper"
            style={{ animationDelay: `${index * 0.05}s` }} // Effet cascade
          >
            <img 
              src={img.url} 
              alt={img.alt} 
              className="gallery-img"
              loading="lazy" // Très important pour beaucoup de photos
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;