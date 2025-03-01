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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/movies")
@Tag(name = "Movie", description = "Operations related to Movies")
public class MoviesController {
    @Autowired
    private MoviesService moviesService;
    @Operation(summary = "Get top 5 movies", description = "Get the top 5 movies inside the database ordered by rating")
    @GetMapping("/getTopFiveMovies")
    public ResponseEntity<List<MovieTitlePosterRatingDTO>> findTopFiveMovies() {
        List<MovieTitlePosterRatingDTO> movies = moviesService.findTopFiveMovies();

        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }


    @GetMapping("/getMovieByName")
    @Operation(summary = "Get movie by name", description = "Get movie inside the database, by name and ordered by rating")
    public ResponseEntity<List<MovieByNameDTO>> findMovieByName(@Parameter(description = "Search by name")@RequestParam String name) {
        List<MovieByNameDTO> movies = moviesService.findMovieByName(name);
        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping("/getMovieById")
    @Operation(summary = "Get movie by id", description = "Find the corresponding movie by its id")
    public ResponseEntity<MovieByIdDTO> findMovieById(@Parameter(description = "Search by id")@RequestParam Long id) {
        MovieByIdDTO movie = moviesService.findMovieById(id);
        if (movie == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(movie, HttpStatus.OK);
    }

    @GetMapping("/topRated")
    @Operation(summary = "Get 20 movies by genre or attribute", description = "Get 20 most rated movies inside the database, filtering by attribute or genre")
    public ResponseEntity<List<MovieTitlePosterDTO>> findMovieByGenre(@Parameter(description = "Search by genre or attribute")@RequestParam("genre") String genreName) {
        List<MovieTitlePosterDTO> movies = moviesService.findMoviesByGenre(genreName);
        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping("/ageMin")
    @Operation(summary = "Get 20 movies by minimum age", description = "Get 20 most rated movies inside the database, filtering by minimum age")
    public ResponseEntity<List<MovieTitlePosterRatingDTO>> findMovieByAgeMin(@Parameter(description = "Search by minimum age")@RequestParam("age_min") int ageMin) {
        List<MovieTitlePosterRatingDTO> movies=moviesService.findMoviesByAgeMin(ageMin);
        if (movies.isEmpty()) {

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else
            return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping("/getWorldwideMovies")
    @Operation(summary = "Get 20 movies rated worldwide", description = "Get 20 most rated worldwide movies inside the database")
    public ResponseEntity<List<MovieTitlePosterCountDTO>> findMovieByAgeMin() {
        List<MovieTitlePosterCountDTO> movies=moviesService.findWorldwideMovies();
        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else
            return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping("/getCultLanguage")
    @Operation(summary = "Get 20 movies by Cult language", description = "Get 20 most rated movies inside the database, filtering Language")
    public ResponseEntity<List<MovieTitlePosterDTO>> findCultLanguage(@Parameter(description = "Search by language")@RequestParam String language) {
        List<MovieTitlePosterDTO> movies=moviesService.findCultLanguageMovies(language);
        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else
            return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping("/getFilteredMovies")
    @Operation(summary = "Get filtered movies ", description = "Get all movies, but filtered by Order Name/ordered date/rating/genre")
    public ResponseEntity<Page<MovieTitlePosterDTO>> findFiltered(@Parameter(description = "Order by name")@RequestParam(required = false) String orderByName,@Parameter(description = "Order by date") @RequestParam(required = false) String orderByDate,@Parameter(description = "Order by rating")  @RequestParam(required = false) String byRating,@Parameter(description = "Filter by genre") @RequestParam(required = false) String genre, @RequestParam int page) {
        Pageable pageable = PageRequest.of(page, 50);
        Page<MovieTitlePosterDTO> movies = moviesService.findFilteredMovies(pageable, orderByName, orderByDate, byRating, genre);
        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else
            return new ResponseEntity<>(movies, HttpStatus.OK);
    }
}
