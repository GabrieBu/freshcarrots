package com.example.spring_boot_server.genres;
import com.example.spring_boot_server.genres.dtos.GenreNameDTO;
import com.example.spring_boot_server.genres.dtos.GenresDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/genres")
public class GenresController {
    @Autowired
    private GenresService genresService;

    /*@GetMapping("/getGenres")
    public ResponseEntity<List<GenresDTO>>findGenres() {
        List<GenresDTO> genres = genresService.findDistinctGenres();
        if (genres.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(genres);
    }*/
}
