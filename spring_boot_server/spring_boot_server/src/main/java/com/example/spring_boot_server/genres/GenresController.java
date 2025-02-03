package com.example.spring_boot_server.genres;
import com.example.spring_boot_server.genres.dtos.GenreNameDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/genres")
@Tag(name = "Genres", description = "Operations related to Genres")
public class GenresController {
    @Autowired
    private GenresService genresService;

    @GetMapping("/getGenres")
    @Operation(summary = "Get all movies genres name", description = "Get all genres")
    public ResponseEntity<List<GenreNameDTO>>findGenres() {
        List<GenreNameDTO> genres = genresService.findDistinctGenres();
        if (genres.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(genres);
    }
}
