package com.example.spring_boot_server.movies;

import com.example.spring_boot_server.movies.dtos.MovieTitlePosterlinkDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MoviesService {
    @Autowired
    private MoviesRepository moviesRepository;

    public List<MovieTitlePosterlinkDTO> findTopFiveMovies() {
        List<Movie> movies = moviesRepository.findTop5ByRatingIsNotNullAndDateIsNotNullOrderByRatingDescDateDesc();

        return movies.stream()
                .map(movie -> new MovieTitlePosterlinkDTO(
                        movie.getId(),
                        movie.getName(),
                        (movie.getPoster() != null) ? movie.getPoster().getLink() : null  // Only extract link
                ))
                .collect(Collectors.toList());
    }

    public List<Movie> findMovieByName(String name) {
        return moviesRepository.findMovieByName(name); //returns all fields
    }
}
