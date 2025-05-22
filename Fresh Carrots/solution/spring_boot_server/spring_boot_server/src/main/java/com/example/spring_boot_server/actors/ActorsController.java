package com.example.spring_boot_server.actors;
import com.example.spring_boot_server.actors.dtos.ActorNameDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/actors")
@Tag(name = "Actors", description = "Operations related to Actors")
public class ActorsController {
    private final ActorsService actorsService;

    @Autowired
    public ActorsController(ActorsService actorsService) {
        this.actorsService = actorsService;
    }

    @GetMapping("/getByName")
    @Operation(summary = "find actors by name", description = "Get all actors by his name")
    public ResponseEntity<List<ActorNameDTO>> findActorsByName(@Parameter(description = "Search by name") @RequestParam String name) {
        List<ActorNameDTO> actors = actorsService.findActorsByName(name);
        if (actors.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(actors);
    }

    @GetMapping("/get")
    @Operation(summary = "get all actors", description = "Get all actors inside the database table")
    public ResponseEntity<List<ActorNameDTO>> findActors() {
        List<ActorNameDTO> actors = actorsService.findtest();
        if (actors.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(actors);
    }
}
