package com.example.spring_boot_server.posters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/posters")
public class PostersController {
    private final PostersService postersService;

    @Autowired
    public PostersController(PostersService postersService) {
        this.postersService = postersService;
    }

    @GetMapping("/findByMovie")
    public ResponseEntity<List<Poster>>findPosterByMovie(@RequestParam Integer id) {
        List<Poster> posters = postersService.findPosterByMovie(id);
        if (posters.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(posters);
    }
}
