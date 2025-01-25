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
        List<Movie> movies = moviesRepository.findTopFiveMovies();
        System.out.println("Repository query executed. Movies retrieved: " + movies.size());
        return movies;
    }
}
