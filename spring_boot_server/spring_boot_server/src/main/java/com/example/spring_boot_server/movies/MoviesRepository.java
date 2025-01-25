package com.example.spring_boot_server.movies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoviesRepository extends JpaRepository<Movie, Long> {

    @Query(value = "SELECT * FROM movies WHERE name = :title", nativeQuery = true)
    List<Movie> findMovie(String title);


    @Query(value = "SELECT m.*, p.* FROM movies m " +
            "JOIN posters p ON p.id_film = m.id_film " +
            "ORDER BY m.rating DESC, m.date DESC " +
            "LIMIT 5", nativeQuery = true)
    List<Movie> findTopFiveMovies();
}
