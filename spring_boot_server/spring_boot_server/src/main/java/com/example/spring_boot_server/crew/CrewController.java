package com.example.spring_boot_server.crew;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/crew")
public class CrewController {
    private final CrewService crewService;

    @Autowired
    public CrewController(CrewService crewService) {
        this.crewService = crewService;
    }

    @GetMapping("/findByMovie")
    public ResponseEntity<List<Crew>>findCrewByMovie(@RequestParam Integer id) {
        List<Crew> crew = crewService.findCrewByMovie(id);
        if (crew.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(crew);
    }
}
