package com.example.spring_boot_server.genres;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GenresRepository extends JpaRepository<Genre, Long> {

    @Query(value = "SELECT * FROM genres WHERE id_film = :movieId", nativeQuery = true)
    List<Genre> findByMovie(Integer movieId);
}
