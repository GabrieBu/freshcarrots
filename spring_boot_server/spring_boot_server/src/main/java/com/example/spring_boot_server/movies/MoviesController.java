package com.example.spring_boot_server.movies;
import com.example.spring_boot_server.movies.dtos.MovieByIdDTO;
import com.example.spring_boot_server.movies.dtos.MovieByNameDTO;
import com.example.spring_boot_server.movies.dtos.MovieTitlePosterlinkDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<List<MovieByNameDTO>> findMovieByName(@RequestParam String name) {
        List<MovieByNameDTO> movies = moviesService.findMovieByName(name);
        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping("/getMovieById")
    public ResponseEntity<MovieByIdDTO> findMovieById(@RequestParam Long id) {
        MovieByIdDTO movie = moviesService.findMovieById(id);
        if (movie == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(movie, HttpStatus.OK);
    }

    @GetMapping("/topRated")
    public ResponseEntity<List<MovieTitlePosterlinkDTO>> findMovieByGenre(@RequestParam("genre") String genreName) {
        List<MovieTitlePosterlinkDTO> movies = moviesService.findMoviesByGenre(genreName);
        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }
}
