package com.example.spring_boot_server.crew;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/crew")
@Tag(name = "Crew", description = "Operations related to Crew")
public class CrewController {
    private final CrewService crewService;

    @Autowired
    public CrewController(CrewService crewService) {
        this.crewService = crewService;
    }

    @GetMapping("/findByMovie")
    @Operation(summary = "find crew by movie id", description = "Get all crew members of a movie")
    public ResponseEntity<List<Crew>>findCrewByMovie(@Parameter(description = "Movie id to search") @RequestParam Integer id) {
        List<Crew> crew = crewService.findCrewByMovie(id);
        if (crew.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(crew);
    }
}
