package com.example.spring_boot_server.crew;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CrewRepository extends JpaRepository<Crew, Long> {

    @Query(value = "SELECT * FROM crew WHERE id_film = :movieId", nativeQuery = true)
    List<Crew> findByMovie(Integer movieId);
}
