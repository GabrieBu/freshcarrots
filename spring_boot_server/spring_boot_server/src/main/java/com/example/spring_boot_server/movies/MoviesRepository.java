package com.example.spring_boot_server.movies;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoviesRepository {

    @Query(value = "SELECT * FROM movies WHERE name = :title", nativeQuery = true)
    List<Movie> findMovie(String title);

}
