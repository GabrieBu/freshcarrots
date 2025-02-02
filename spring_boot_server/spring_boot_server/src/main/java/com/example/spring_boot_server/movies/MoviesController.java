package com.example.spring_boot_server.movies;
import com.example.spring_boot_server.movies.dtos.*;
import com.example.spring_boot_server.movies.dtos.MovieTitlePosterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<List<MovieTitlePosterRatingDTO>> findTopFiveMovies() {
        List<MovieTitlePosterRatingDTO> movies = moviesService.findTopFiveMovies();

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
    public ResponseEntity<List<MovieTitlePosterDTO>> findMovieByGenre(@RequestParam("genre") String genreName) {
        List<MovieTitlePosterDTO> movies = moviesService.findMoviesByGenre(genreName);
        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping("/ageMin")
    public ResponseEntity<List<MovieTitlePosterRatingDTO>> findMovieByAgeMin(@RequestParam("age_min") int ageMin) {
        List<MovieTitlePosterRatingDTO> movies=moviesService.findMoviesByAgeMin(ageMin);
        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else
            return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping("/getWorldwideMovies")
    public ResponseEntity<List<MovieTitlePosterCountDTO>> findMovieByAgeMin() {
        List<MovieTitlePosterCountDTO> movies=moviesService.findWorldwideMovies();
        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else
            return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping("/getCultLanguage")
    public ResponseEntity<List<MovieTitlePosterDTO>> findCultLanguage(@RequestParam String language) {
        List<MovieTitlePosterDTO> movies=moviesService.findCultLanguageMovies(language);
        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else
            return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping("/getFilteredMovies")
    public ResponseEntity<Page<MovieTitlePosterDTO>> findFiltered(@RequestParam String orderByName, @RequestParam String orderByDate,  @RequestParam String byRating, @RequestParam String genre, @RequestParam int page) {
        Pageable pageable = PageRequest.of(page, 50);
        Page<MovieTitlePosterDTO> movies = moviesService.findFilteredMovies(pageable, orderByName, orderByDate, byRating, genre);
        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else
            return new ResponseEntity<>(movies, HttpStatus.OK);
    }
}
