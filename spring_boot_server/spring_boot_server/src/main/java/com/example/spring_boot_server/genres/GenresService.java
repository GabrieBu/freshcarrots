package com.example.spring_boot_server.genres;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class GenresService {
    private final GenresRepository genresRepository;
    @Autowired
    public GenresService(GenresRepository genresRepository) {
        this.genresRepository = genresRepository;
    }

    public List<Genres> findGenresOfMovie(Integer movieId) {
        return genresRepository.findByMovie(movieId);
    }

}
