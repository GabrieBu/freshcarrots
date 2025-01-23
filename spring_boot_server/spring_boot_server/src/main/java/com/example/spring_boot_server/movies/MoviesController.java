package com.example.spring_boot_server.movies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/movies")
public class MoviesController {
    private final MoviesService moviesService;

    @Autowired
    public MoviesController(MoviesService moviesService) {
        this.moviesService = moviesService;
    }

    @GetMapping("/findMovie")
    public ResponseEntity<List<Movie>>findMovie(@RequestParam String title) {
        List<Movie> languages = moviesService.findMovie(title);
        if (languages.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(languages);
    }
}
