package com.example.spring_boot_server.studios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/studio")
public class StudiosController {
    private final StudiosService studiosService;

    @Autowired
    public StudiosController(StudiosService studiosService) {this.studiosService = studiosService;}

    @GetMapping("/findByMovie")
    public ResponseEntity<List<Studios>>findReleaseByMovie(@RequestParam Integer id) {
        List<Studios> studios = studiosService.findStudioByMovie(id);
        if (studios.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }else
            return ResponseEntity.status(HttpStatus.OK).body(studios);
    }

}
