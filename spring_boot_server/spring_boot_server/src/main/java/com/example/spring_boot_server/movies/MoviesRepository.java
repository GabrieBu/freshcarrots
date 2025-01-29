package com.example.spring_boot_server.movies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface MoviesRepository extends JpaRepository<Movie, Long> {
    List<Movie> findTop5ByRatingIsNotNullAndDateIsNotNullOrderByRatingDescDateDesc();
    List<Movie> findMovieByName(String name);
    List<Movie> findAllByOrderByRatingDesc(); //query most rated
    List<Movie> findAllByOrderByRatingAsc(); //query più brutti
    List<Movie> findTop20ByGenres_GenreOrderByRatingDesc(String genreName);
}
