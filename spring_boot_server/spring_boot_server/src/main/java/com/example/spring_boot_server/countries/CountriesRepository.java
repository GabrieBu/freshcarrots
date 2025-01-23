package com.example.spring_boot_server.countries;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CountriesRepository {

    @Query(value = "SELECT * FROM country WHERE id_film = :movieId", nativeQuery = true)
    List<Country> findByMovie(Integer movieId);
}
