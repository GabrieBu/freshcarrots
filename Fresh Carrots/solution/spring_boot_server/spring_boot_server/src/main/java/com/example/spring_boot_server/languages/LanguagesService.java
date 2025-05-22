package com.example.spring_boot_server.languages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class LanguagesService {
 private final LanguagesRepository languagesRepository;

    @Autowired
    public LanguagesService(LanguagesRepository languagesRepository) {
        this.languagesRepository = languagesRepository;
    }

    public List<Language> findLanguageOfMovie(Integer movieId) {
        return languagesRepository.findByMovie(movieId);
    }
}
