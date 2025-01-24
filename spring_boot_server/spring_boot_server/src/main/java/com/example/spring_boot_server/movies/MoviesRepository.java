package com.example.spring_boot_server.movies;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface MoviesRepository {

    @Query(value = "SELECT * FROM movies WHERE name = :title", nativeQuery = true)
    List<Movie> findMovie(String title);

    @Query(value = "SELECT m.title AS title, m.description AS description, m.rating AS rating, p.poster_url AS posterUrl " +
            "FROM movies m " +
            "JOIN posters p ON m.id = p.id_film " +
            "ORDER BY m.rating DESC " +
            "LIMIT 5",
            nativeQuery = true)
     List<Map<String, Object>> findTop5MoviesWithPosters();

}
