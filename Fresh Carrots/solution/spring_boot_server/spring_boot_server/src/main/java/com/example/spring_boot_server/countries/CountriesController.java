package com.example.spring_boot_server.countries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/countries")
public class CountriesController {
    private final CountriesService countriesService;

    @Autowired
    public CountriesController(CountriesService countriesService) {
        this.countriesService = countriesService;
    }

    /*@GetMapping("/findByMovie")
    public ResponseEntity<List<Country>>findCountryByMovie(@RequestParam Integer id) {
        List<Country> countries = countriesService.findCountryByMovie(id);
        if (countries.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(countries);
    }*/
}
