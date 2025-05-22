package com.example.spring_boot_server.themes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ThemesService {
    private final ThemesRepository themesRepository;

    @Autowired
    public ThemesService(ThemesRepository themesRepository) {this.themesRepository = themesRepository;}

    public List<Theme> findThemesByMovie(Integer movieId) {return  themesRepository.findByMovie(movieId);}
}
