package com.example.spring_boot_server.actors;
import com.example.spring_boot_server.actors.dtos.ActorNameDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ActorsRepository extends JpaRepository<Actor, Long> {

    @Query(value = "SELECT id, name FROM ( " +
            "SELECT DISTINCT ON(a.name, ordering) a.id, a.name,  " +
            "        CASE  " +
            "            WHEN a.name ILIKE :name THEN 1  " +
            "            WHEN a.name ILIKE CONCAT(:name, '%') THEN 2  " +
            "            ELSE 3  " +
            "        END AS ordering " +
            "    FROM actors a  " +
            "    WHERE to_tsvector('english', a.name) @@ to_tsquery('english', :name) " +
            "ORDER BY ordering ASC " +
            "LIMIT 20 " +
            ")", nativeQuery = true)
    List<ActorNameDTO> findActorsByName(@Param("name") String name);

    @Query(value = "SELECT id, name FROM actors", nativeQuery = true)
    List<ActorNameDTO> findTest();

}