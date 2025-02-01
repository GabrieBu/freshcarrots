package com.example.spring_boot_server.genres;
import com.example.spring_boot_server.genres.dtos.GenreNameDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GenresRepository extends JpaRepository<Genre, Long> {

    @Query(value = "SELECT DISTINCT new com.example.spring_boot_server.genres.dtos.GenreNameDTO(g.genre) FROM Genre g")
    List<GenreNameDTO> findAllDistinctGenres();
}
