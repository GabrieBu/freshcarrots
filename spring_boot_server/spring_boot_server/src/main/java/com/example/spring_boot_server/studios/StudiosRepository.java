package com.example.spring_boot_server.studios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StudiosRepository extends JpaRepository<Studios, Long> {

    @Query(value = "SELECT * FROM studios WHERE id_film = :movieId", nativeQuery = true)
    List<Studios> findByMovie(Integer movieId);
}
