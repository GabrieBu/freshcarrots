package com.example.spring_boot_server.actors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/actors")
public class ActorsController {
    private final ActorsService actorsService;

    @Autowired
    public ActorsController(ActorsService actorsService) {
        this.actorsService = actorsService;
    }

    @GetMapping("/all")
    public String getActorMovie(@RequestBody String actors) {
        return "Test degli attori "+actors;
    }

    /*@GetMapping("/findByMovie")
    public ResponseEntity<Actor> findActorsByMovie(@RequestParam String name) {
        Optional<Actor> actors = actorsService.findActorsByMovie(name);
        return actors.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }*/

    /*@GetMapping("/findByName")
    public ResponseEntity<List<Actor>> findActorsByName(@RequestParam String name) {
        List<Actor> actors = actorsService.findActorsByName(name);
        if (actors.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(actors);
    }*/
}
