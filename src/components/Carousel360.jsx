import React, { useState, useEffect } from "react";
import "../styles/carousel360.css";

const cards = [
  {id: 1, title: "Art 1", image: "/images/gallery/image_1.jpg" },
  {id: 2, title: "Art 1", image: "/images/gallery/image_3.jpg" },
  {id: 3, title: "Art 1", image: "/images/gallery/image_4.jpg" },
  {id: 4, title: "Art 1", image: "/images/gallery/image_5.jpg" },
  {id: 5, title: "Art 1", image: "/images/gallery/image_6.jpg" },
  {id: 6, title: "Art 1", image: "/images/gallery/image_7.jpg" },
  {id: 7, title: "Art 1", image: "/images/gallery/image_8.jpg" },
  {id: 8, title: "Art 1", image: "/images/gallery/image_9.jpg" },
  {id: 9, title: "Art 1", image: "/images/gallery/image_10.jpg" },
  {id: 10, title: "Art 1", image: "/images/gallery/image_11.jpg" },
  {id: 11, title: "Art 1", image: "/images/gallery/image_12.jpg" },
  {id: 12, title: "Art 1", image: "/images/gallery/image_13.jpg" },
  {id: 13, title: "Art 1", image: "/images/gallery/image_14.jpg" },
  {id: 14, title: "Art 1", image: "/images/gallery/image_15.jpg" },
  {id: 15, title: "Art 1", image: "/images/gallery/image_17.jpg" },
  {id: 16, title: "Art 1", image: "/images/gallery/image_18.jpg" },
  {id: 17, title: "Art 1", image: "/images/gallery/image_19.jpg" },
  {id: 18, title: "Art 1", image: "/images/gallery/image_20.jpg" },
  {id: 19, title: "Art 1", image: "/images/gallery/image_21.jpg" },
  {id: 20, title: "Art 1", image: "/images/gallery/image_22.jpg" },
  {id: 21, title: "Art 1", image: "/images/gallery/image_23.jpg" },
  {id: 22, title: "Art 1", image: "/images/gallery/image_24.jpg" },
  {id: 23, title: "Art 1", image: "/images/gallery/image_25.jpg" },
  {id: 24, title: "Art 1", image: "/images/gallery/image_26.jpg" },
  {id: 25, title: "Art 1", image: "/images/gallery/image_27.jpg" },
  {id: 26, title: "Art 1", image: "/images/gallery/image_28.jpg" },
  {id: 27, title: "Art 1", image: "/images/gallery/image_29.jpg" },
  {id: 28, title: "Art 1", image: "/images/gallery/image_30.jpg" },
  {id: 29, title: "Art 1", image: "/images/gallery/image_31.jpg" },
  {id: 30, title: "Art 1", image: "/images/gallery/image_32.jpg" },
  {id: 31, title: "Art 1", image: "/images/gallery/image_33.jpg" },
  {id: 32, title: "Art 1", image: "/images/gallery/image_34.jpg" },
  {id: 33, title: "Art 1", image: "/images/gallery/image_35.jpg" },
  {id: 34, title: "Art 1", image: "/images/gallery/image_36.jpg" },
  {id: 35, title: "Art 1", image: "/images/gallery/image_37.jpg" },
  {id: 36, title: "Art 1", image: "/images/gallery/image_38.jpg" },
  {id: 37, title: "Art 1", image: "/images/gallery/image_39.jpg" },
  {id: 38, title: "Art 1", image: "/images/gallery/image_40.jpg" }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Déroulement automatique toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getIndex = (offset) => {
    return (currentIndex + offset + cards.length) % cards.length;
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel">
        <div className="carousel-card prev">
          <img src={cards[getIndex(-1)].image}  />
        </div>

        <div className="carousel-card current">
          <img src={cards[currentIndex].image}  />
        </div>

        <div className="carousel-card next">
          <img src={cards[getIndex(1)].image}  />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
