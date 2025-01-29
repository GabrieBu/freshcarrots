import { useState } from "react";
import "./Carousel.css"; // Custom styles

const Carousel = () => {
  const movies = [
    { id: 1, title: "Image 1", image: "https://source.unsplash.com/random/300x450?sig=1" },
    { id: 2, title: "Image 2", image: "https://source.unsplash.com/random/300x450?sig=2" },
    { id: 3, title: "Image 3", image: "https://source.unsplash.com/random/300x450?sig=3" },
    { id: 4, title: "Image 4", image: "https://source.unsplash.com/random/300x450?sig=4" },
    { id: 5, title: "Image 5", image: "https://source.unsplash.com/random/300x450?sig=5" },
    { id: 6, title: "Image 6", image: "https://picsum.photos/300/450?random=1" },
    { id: 7, title: "Image 7", image: "https://picsum.photos/300/450?random=2" },
    { id: 8, title: "Image 8", image: "https://picsum.photos/300/450?random=3" },
    { id: 9, title: "Image 9", image: "https://picsum.photos/300/450?random=4" },
    { id: 10, title: "Image 10", image: "https://picsum.photos/300/450?random=5" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsVisible = 8;

  const nextPage = () => {
    if (currentIndex < movies.length - itemsVisible) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
      <div className="carousel-container">
        <button className="carousel-control prev" onClick={prevPage} disabled={currentIndex === 0}>
          ❮
        </button>

        <div className="carousel-wrapper">
          <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 12.5}%)` }}>
            {movies.map((movie) => (
                <div key={movie.id} className="movie-card" onClick={() => alert(`Hai cliccato su: ${movie.title}`)}>
                  <img src={movie.image} alt={movie.title} />
                  <p>{movie.title}</p>
                </div>
            ))}
          </div>
        </div>

        <button className="carousel-control next" onClick={nextPage} disabled={currentIndex >= movies.length - itemsVisible}>
          ❯
        </button>
      </div>
  );
};

export default Carousel;
