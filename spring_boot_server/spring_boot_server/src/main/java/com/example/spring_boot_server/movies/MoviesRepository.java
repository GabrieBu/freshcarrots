package com.example.spring_boot_server.movies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoviesRepository extends JpaRepository<Movie, Long> {

    @Query(value = "SELECT * FROM movies WHERE name = :title", nativeQuery = true)
    List<Movie> findMovie(String title);


    @Query(value = "SELECT *\n" +
            "            FROM movies\n" +
            "            WHERE movies.rating IS NOT NULL\n" +
            "            AND movies.date IS NOT NULL\n" +
            "            ORDER BY movies.rating DESC, movies.date DESC\n" +
            "            LIMIT 5;", nativeQuery = true)
    List<Movie> findTopFiveMovies();
}
