package com.example.spring_boot_server.themes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/themes")
public class ThemesController {
    private final ThemesService themesService;

    @Autowired
    public ThemesController(ThemesService themesService) {this.themesService = themesService;}

    @GetMapping("/findByMovie")
    public ResponseEntity<List<Theme>>findThemesByMovie(@RequestParam Integer id) {
        List<Theme> themes = themesService.findThemesByMovie(id);
        if (themes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }else
            return ResponseEntity.status(HttpStatus.OK).body(themes);
    }
}
