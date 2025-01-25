package com.example.spring_boot_server.languages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/languages")
public class LanguagesController {
    private final LanguagesService languagesService;

    @Autowired
    public LanguagesController(LanguagesService languagesService) {
        this.languagesService = languagesService;
    }

    @GetMapping("/findByMovie")
    public ResponseEntity<List<Language>>findLanguageOfMovie(@RequestParam Integer id) {
        List<Language> languages = languagesService.findLanguageOfMovie(id);
        if (languages.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(languages);
    }
}
