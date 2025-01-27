package com.example.spring_boot_server.movies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoviesRepository extends JpaRepository<Movie, Long> {

    List<Movie> findTop5ByRatingIsNotNullAndDateIsNotNullOrderByRatingDescDateDesc();
}
