package com.example.spring_boot_server.actors;
import com.example.spring_boot_server.actors.dtos.ActorNameDTO;
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

    @GetMapping("/getByName")
    public ResponseEntity<List<ActorNameDTO>> findActorsByName(@RequestParam String name) {
        List<ActorNameDTO> actors = actorsService.findActorsByName(name);
        if (actors.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(actors);
    }

    @GetMapping("/get")
    public ResponseEntity<List<ActorNameDTO>> findActors() {
        List<ActorNameDTO> actors = actorsService.findtest();
        if (actors.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(actors);
    }
}
