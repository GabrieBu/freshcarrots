package com.example.spring_boot_server.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MoviesService {
    private final MoviesRepository moviesRepository;
    @Autowired
    public MoviesService(MoviesRepository moviesRepository) {
        this.moviesRepository = moviesRepository;
    }

    public List<Movie> findTopFiveMovies() {
        return moviesRepository.findTop5ByRatingIsNotNullAndDateIsNotNullOrderByRatingDescDateDesc();
    }

    public List<Movie> findMovieByName(String name) {
        return moviesRepository.findMovieByName(name);
    }

   /* public List<Movie> findMovieByGenre(String genre) {
        return moviesRepository.findMoviesByGenre(genre);
    }*/
}
