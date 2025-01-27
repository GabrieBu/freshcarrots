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

    @GetMapping("/getTopFiveMovies")
    public ResponseEntity<List<Movie>> findTopFiveMovies() {
        List<Movie> movies = moviesService.findTopFiveMovies();
        if (movies.isEmpty() || movies.size() < 5) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping("/getMovieByName")
    public ResponseEntity<List<Movie>> findMovieByName(@RequestParam String name) {
        List<Movie> movies = moviesService.findMovieByName(name);
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    /*@GetMapping("/getMovieByGenre")
    public ResponseEntity<List<Movie>> findMovieByGenre(@RequestParam String genre) {
        List<Movie> movies = moviesService.findMovieByGenre(genre);
        if(movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }*/
}
