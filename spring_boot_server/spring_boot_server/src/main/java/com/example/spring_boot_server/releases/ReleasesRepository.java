package com.example.spring_boot_server.releases;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReleasesRepository {
    @Query(value = "SELECT * FROM releases WHERE id_film = :movieId", nativeQuery = true)
    List<Release> findByMovie(Integer movieId);
}
