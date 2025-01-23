package com.example.spring_boot_server.languages;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LanguagesRepository {

    @Query(value = "SELECT * FROM languages WHERE id_film = :movieId", nativeQuery = true)
    List<Language> findByMovie(Integer movieId);
}
