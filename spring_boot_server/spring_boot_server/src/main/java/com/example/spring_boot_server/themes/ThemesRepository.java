package com.example.spring_boot_server.themes;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ThemesRepository {

    @Query(value = "SELECT * FROM themes WHERE id_film = :movieId", nativeQuery = true)
    List<Theme> findByMovie(Integer movieId);
}
