package com.example.spring_boot_server.movies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MoviesRepository extends JpaRepository<Movie, Long> {
    List<Movie> findTop5ByRatingIsNotNullAndDateIsNotNullOrderByRatingDescDateDesc();
    List<Movie> findMovieByName(String name);
    List<Movie> findTop20ByGenres_GenreOrderByRatingDescDateDesc(String genreName);
    Optional<Movie> findMovieById(Long id);
}
