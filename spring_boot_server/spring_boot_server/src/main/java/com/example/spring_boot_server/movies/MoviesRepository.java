package com.example.spring_boot_server.movies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoviesRepository extends JpaRepository<Movie, Long> {

    @Query(value = "SELECT m.* " +
            "FROM movies m " +
            "JOIN posters p ON p.id_film = m.id " +
            "ORDER BY m.rating DESC, m.date DESC " +
            "LIMIT 5", nativeQuery = true)
    List<Movie> findTopFiveMovies();
}
