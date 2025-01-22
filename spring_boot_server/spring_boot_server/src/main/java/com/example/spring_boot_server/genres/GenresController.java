package com.example.spring_boot_server.genres;
import com.example.spring_boot_server.countries.Countries;
import com.example.spring_boot_server.countries.CountriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/genres")
public class GenresController {
    private final GenresService genresService;

    @Autowired
    public GenresController(GenresService genresService) {
        this.genresService = genresService;
    }

    @GetMapping("/findByMovie")
    public ResponseEntity<List<Genres>>findCountryByMovie(@RequestParam Integer id) {
        List<Genres> genres = genresService.findGenresOfMovie(id);
        if (genres.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(genres);
    }
}
