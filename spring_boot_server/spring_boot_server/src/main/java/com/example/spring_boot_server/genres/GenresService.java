package com.example.spring_boot_server.genres;
import com.example.spring_boot_server.genres.dtos.GenreNameDTO;
import com.example.spring_boot_server.genres.dtos.GenresDTO;
import com.example.spring_boot_server.movies.dtos.MovieTitlePosterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GenresService {
    @Autowired
    private GenresRepository genresRepository;

    public List<GenreNameDTO> findDistinctGenres() {
        return genresRepository.findAllDistinctGenres();
    }
}