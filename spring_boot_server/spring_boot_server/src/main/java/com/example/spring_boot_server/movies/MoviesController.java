package com.example.spring_boot_server.movies;
import com.example.spring_boot_server.movies.dtos.MovieTitlePosterlinkDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/movies")
public class MoviesController {
    @Autowired
    private MoviesService moviesService;

    @GetMapping("/getTopFiveMovies")
    public ResponseEntity<List<MovieTitlePosterlinkDTO>> findTopFiveMovies() {
        List<MovieTitlePosterlinkDTO> movies = moviesService.findTopFiveMovies();

        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping("/getMovieByName")
    public ResponseEntity<List<Movie>> findMovieByName(@RequestParam String name) {
        List<Movie> movies = moviesService.findMovieByName(name);
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }
}
