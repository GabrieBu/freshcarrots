package com.example.spring_boot_server.posters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PostersRepository extends JpaRepository<Poster, Long> {
    @Query(value = "SELECT * FROM posters WHERE id_film = :movieId", nativeQuery = true)
    List<Poster> findByMovie(Integer movieId);
}
