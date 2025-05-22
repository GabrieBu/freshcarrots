package com.example.spring_boot_server.countries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CountriesService {
    private final CountriesRepository countriesRepository;
    @Autowired
    public CountriesService(CountriesRepository countriesRepository) {
        this.countriesRepository = countriesRepository;
    }

    /*public List<Country> findCountryByMovie(Integer movieId) {
        return countriesRepository.findByMovie(movieId);
    }*/
}
