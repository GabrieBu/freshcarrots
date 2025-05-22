package com.example.spring_boot_server.releases;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/releases")
public class ReleasesController {
    private final ReleasesService releasesService;

    @Autowired
    public ReleasesController(ReleasesService releasesService) {this.releasesService = releasesService;}

    @GetMapping("/findByMovie")
    public ResponseEntity<List<Release>>findReleaseByMovie(@RequestParam Integer id) {
        List<Release> releases = releasesService.findReleaseByMovie(id);
        if (releases.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }else
            return ResponseEntity.status(HttpStatus.OK).body(releases);
        }
    }