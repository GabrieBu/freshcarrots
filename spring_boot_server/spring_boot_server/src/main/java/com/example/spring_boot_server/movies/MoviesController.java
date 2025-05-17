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

    @GetMapping("/getTopFiveMovies")
    @Operation(summary = "Get top 5 movies", description = "Get the top 5 movies inside the database ordered by rating")
    public ResponseEntity<List<MovieTitlePosterDescDTO>> findTopFiveMovies() {
        try {
            List<MovieTitlePosterDescDTO> movies = moviesService.findTopFiveMovies();
            if (movies == null || movies.isEmpty()) {
                return ResponseEntity.noContent().build(); // 204
            }
            return ResponseEntity.ok(movies); // 200
        } catch (Exception ex) {
            // For any unexpected exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500
        }
    }

    @GetMapping("/getMovieByName")
    @Operation(summary = "Get movie by name", description = "Get movie inside the database, by name and ordered by rating")
    public ResponseEntity<List<MovieByNameDTO>> findMovieByName(@Parameter(description = "Search by name")@RequestParam String name) {
        try {
            List<MovieByNameDTO> movies = moviesService.findMovieByName(name);
            if (movies.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
            }
            return new ResponseEntity<>(movies, HttpStatus.OK);
        }
        catch(Exception ex){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getMovieById")
    @Operation(summary = "Get movie by id", description = "Find the corresponding movie by its id")
    public ResponseEntity<MovieByIdDTO> findMovieById(@Parameter(description = "Search by id")@RequestParam Long id) {
        try {
            MovieByIdDTO movie = moviesService.findMovieById(id);

            if (movie == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
            }

            return ResponseEntity.ok(movie); // 200 OK
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 Internal Server Error
        }
    }

    @GetMapping("/topRated")
    @Operation(summary = "Get 20 movies by genre or attribute", description = "Get 20 most rated movies inside the database, filtering by attribute or genre")
    public ResponseEntity<List<MovieTitlePosterDTO>> findMovieByGenre(@Parameter(description = "Search by genre or attribute")@RequestParam("genre") String genreName) {
        try {
            List<MovieTitlePosterDTO> movies = moviesService.findMoviesByGenre(genreName);
            if (movies.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
            }
            return new ResponseEntity<>(movies, HttpStatus.OK);
        }
        catch(Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/ageMin")
    @Operation(summary = "Get 20 movies with a minimum parental grade", description = "Get 20 most rated movies inside the database whose parental grade is greater or equal than parental grade specified")
    public ResponseEntity<List<MovieTitlePosterRatingDTO>> findMovieByAgeMin(@Parameter(description = "Search by minimum age")@RequestParam("age_min") int ageMin) {
        try {
            List<MovieTitlePosterRatingDTO> movies = moviesService.findMoviesByAgeMin(ageMin);
            if (movies.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
            }
            return new ResponseEntity<>(movies, HttpStatus.OK);
        }
        catch(Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getWorldwideMovies")
    @Operation(summary = "Get 20 movies rated worldwide", description = "Get 20 most rated worldwide movies inside the database")
    public ResponseEntity<List<MovieTitlePosterCountDTO>> findMovieByAgeMin() {
        try {
            List<MovieTitlePosterCountDTO> movies = moviesService.findWorldwideMovies();
            if (movies.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(movies, HttpStatus.OK);
        }
        catch(Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getCultLanguage")
    @Operation(summary = "Get 20 movies by Cult language", description = "Get 20 most rated movies inside the database, filtering Language")
    public ResponseEntity<List<MovieTitlePosterDTO>> findCultLanguage(@Parameter(description = "Search by language")@RequestParam String language) {
        try {
            List<MovieTitlePosterDTO> movies = moviesService.findCultLanguageMovies(language);
            if (movies.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
            }
            return new ResponseEntity<>(movies, HttpStatus.OK);
        }
        catch(Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getFilteredMovies")
    @Operation(summary = "Get filtered movies ", description = "Get all movies, but filtered by Order Name/ordered date/rating/genre")
    public ResponseEntity<Page<MovieYearPosterDTO>> findFiltered(@Parameter(description = "Order by name")@RequestParam(required = false) String orderByName,@Parameter(description = "Order by date") @RequestParam(required = false) String orderByDate,@Parameter(description = "Order by rating")  @RequestParam(required = false) String byRating,@Parameter(description = "Filter by genre") @RequestParam(required = false) String genre, @RequestParam int page) {
        try {
            Pageable pageable = PageRequest.of(page, 45);
            Page<MovieYearPosterDTO> movies = moviesService.findFilteredMovies(pageable, orderByName, orderByDate, byRating, genre);
            if (movies.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(movies, HttpStatus.OK);
        }
        catch(Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
