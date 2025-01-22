package com.example.spring_boot_server.genres;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GenresRepository {

    @Query(value = "SELECT * FROM genres WHERE id_film = :movieId", nativeQuery = true)
    List<Genres> findByMovie(Integer movieId);
}
