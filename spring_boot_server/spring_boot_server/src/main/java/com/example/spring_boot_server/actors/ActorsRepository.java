package com.example.spring_boot_server.actors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ActorsRepository extends JpaRepository<Actor, Long> {
    // Add custom query methods if required
    //Optional<Actors> findByName(String name);
    /*Optional<Actor> findByMovie(String name);

    @Query(value = "SELECT * FROM actors WHERE name = :name", nativeQuery = true)
     List<Actor> findActorsByNameCustomQuery(String name);
    */

}