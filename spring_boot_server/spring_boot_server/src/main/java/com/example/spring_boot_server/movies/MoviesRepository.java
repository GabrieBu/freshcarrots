package com.example.spring_boot_server.movies;
import com.example.spring_boot_server.movies.dtos.MovieByNameDTO;
import com.example.spring_boot_server.movies.dtos.MovieTitlePosterDTO;
import com.example.spring_boot_server.movies.dtos.MovieTitlePosterRatingDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;



@Repository
public interface MoviesRepository extends JpaRepository<Movie, Long> {
    @Query(value="SELECT new com.example.spring_boot_server.movies.dtos.MovieTitlePosterRatingDTO(m.id, m.name, m.poster.link, m.rating)" +
            "FROM Movie m " +
            "JOIN Poster p ON m.id = p.movie.id " +
            "WHERE m.rating IS NOT NULL AND m.date IS NOT NULL " +
            "ORDER BY m.rating DESC, m.date DESC " +
            "LIMIT 5")
    List<MovieTitlePosterRatingDTO> findTop5ByRating();

    @Query(value = "SELECT m.id, m.name, m.date, p.link " +
            "FROM movies m " +
            "JOIN posters p ON m.id = p.id_film " +
            "WHERE to_tsvector('english', m.name) @@ to_tsquery('english', :name) " +
            "ORDER BY " +
            "   CASE " +
            "       WHEN m.name ILIKE :name THEN 1 " +
            "       WHEN m.name ILIKE CONCAT(:name, '%') THEN 2 " +
            "       ELSE 3 " +
            "   END, " +
            "   COALESCE(m.rating, 0) DESC, " +
            "   m.date DESC " +
            "LIMIT 20", nativeQuery = true)
    List<MovieByNameDTO> findMovieByNameStartingWith(@Param("name") String name);

    @Query(value = "SELECT new com.example.spring_boot_server.movies.dtos.MovieTitlePosterDTO(m.id, m.name, m.poster.link) " +
            "FROM Movie m " +
            "JOIN Genre g ON g.movie.id = m.id " +
            "WHERE g.genre = :genreName AND m.rating IS NOT NULL " +
            "ORDER BY m.rating DESC " +
            "LIMIT 20")
    List<MovieTitlePosterDTO> findTop20MoviesByGenre(String genreName);

    @Query(value="SELECT new com.example.spring_boot_server.movies.dtos.MovieTitlePosterDTO(m.id, m.name,m.poster.link)"+
            "FROM Movie m " +
            "JOIN Release r on r.movie.id =m.id "+
            "Where r.age_min>= :age_min AND m.rating IS NOT NULL " +
            "ORDER BY m.rating DESC " +
            "LIMIT 20")
    List<MovieTitlePosterDTO> findTop20MoviesByAgeMin(int age_min);




    Optional<Movie> findMovieById(Long id);
}

