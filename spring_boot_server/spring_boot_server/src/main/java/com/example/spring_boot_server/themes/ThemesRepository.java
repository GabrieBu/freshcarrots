package com.example.spring_boot_server.themes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ThemesRepository extends JpaRepository<Theme, Long> {

    @Query(value = "SELECT * FROM themes WHERE id_film = :movieId", nativeQuery = true)
    List<Theme> findByMovie(Integer movieId);
}
