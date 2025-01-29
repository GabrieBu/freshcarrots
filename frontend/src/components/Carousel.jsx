import React, { useState, useEffect } from "react";
import "./Carousel.css"; // Per le personalizzazioni finali

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
  const itemsPerPage = 4;
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const nextPage = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleMovieClick = (movie) => {
    alert(`Hai cliccato su: ${movie.title}`);
  };

  // Dividi i film in gruppi da 4 per ciascuna slide
  const movieSlides = [];
  for (let i = 0; i < totalPages; i++) {
    movieSlides.push(movies.slice(i * itemsPerPage, (i + 1) * itemsPerPage));
  }

  useEffect(() => {
    const nextButton = document.querySelector(".carousel-control-next");
    const prevButton = document.querySelector(".carousel-control-prev");

    if (currentIndex === totalPages - 1) {
      nextButton.setAttribute("disabled", "true");
    } else {
      nextButton.removeAttribute("disabled");
    }

    if (currentIndex === 0) {
      prevButton.setAttribute("disabled", "true");
    } else {
      prevButton.removeAttribute("disabled");
    }
  }, [currentIndex]);

  return (
    <div className="carousel-container mt-4">
      <div id="carouselGenre" className="carousel slide" data-bs-ride="carousel" data-bs-wrap="false">

        <div className="carousel-inner">
          {movieSlides.map((movies, index) => (
            <div
              className={`carousel-item ${index === currentIndex ? "active" : ""}`}
              key={index}
            >
              <div className="row justify-content-center">
                {movies.map((movie) => (
                  <div key={movie.id} className="col-3 mb-4">
                    <div
                      className="card movie-card"
                      onClick={() => handleMovieClick(movie)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="card-img-top movie-img"
                      />
                      <div className="card-body text-center">
                        <p className="card-text movie-title">{movie.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselGenre"
          data-bs-slide="prev"
          onClick={prevPage}
          disabled={currentIndex === 0}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselGenre"
          data-bs-slide="next"
          onClick={nextPage}
          disabled={currentIndex === totalPages - 1}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
