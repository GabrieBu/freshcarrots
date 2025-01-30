package com.example.spring_boot_server.movies;

import com.example.spring_boot_server.actors.dtos.ActorDTO;
import com.example.spring_boot_server.crew.dtos.CrewDTO;
import com.example.spring_boot_server.movies.dtos.MovieByIdDTO;
import com.example.spring_boot_server.movies.dtos.MovieByNameDTO;
import com.example.spring_boot_server.movies.dtos.MovieTitlePosterlinkDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MoviesService {
    @Autowired
    private MoviesRepository moviesRepository;

    public List<MovieTitlePosterlinkDTO> findTopFiveMovies() {
        List<Movie> movies = moviesRepository.findTop5ByRatingIsNotNullAndDateIsNotNullOrderByRatingDescDateDesc();

        return movies.stream()
                .map(movie -> new MovieTitlePosterlinkDTO(
                        movie.getId(),
                        movie.getName(),
                        (movie.getPoster() != null) ? movie.getPoster().getLink() : null
                ))
                .collect(Collectors.toList());
    }

    public List<MovieByNameDTO> findMovieByName(String name) {
        List<Movie> movies = moviesRepository.findMovieByName(name);
        if(!movies.isEmpty()){
            return movies.stream()
                    .map(movie -> new MovieByNameDTO(
                            movie.getId(),
                            movie.getName(),
                            movie.getDate(),
                            movie.getPoster() != null ? movie.getPoster().getLink() : null
                    ))
                    .collect(Collectors.toList());
        }
        return List.of();
    }

    public MovieByIdDTO findMovieById(Long id) {
        Optional<Movie> movieOptional = moviesRepository.findMovieById(id);
        if (movieOptional.isPresent()) {
            Movie movie = movieOptional.get();

            return new MovieByIdDTO(
                    movie.getId(),
                    movie.getName(),
                    movie.getDate(),
                    movie.getTagline(),
                    movie.getDescription(),
                    movie.getMinute(),
                    movie.getRating(),
                    movie.getPoster() != null ? movie.getPoster().getLink() : null,
                    movie.getGenres().stream().map(genre -> genre.getGenre()).collect(Collectors.toList()),
                    movie.getStudios().stream().map(studio -> studio.getStudio()).collect(Collectors.toList()),
                    movie.getCrew().stream().map(crew -> new CrewDTO(crew.getRole(), crew.getName())).collect(Collectors.toList()),
                    movie.getActors().stream().map(actor -> new ActorDTO(actor.getName(), actor.getRole())).collect(Collectors.toList()),
                    movie.getThemes().stream().map(theme -> theme.getTheme()).collect(Collectors.toList())
            );
        }
        return null;
    }

    public List<MovieTitlePosterlinkDTO> findMoviesByGenre(String genreName){
        List<Movie> movies = moviesRepository.findTop20ByGenres_GenreOrderByRatingDescDateDesc(genreName);

        return movies.stream()
                .map(movie -> new MovieTitlePosterlinkDTO(
                        movie.getId(),
                        movie.getName(),
                        (movie.getPoster() != null) ? movie.getPoster().getLink() : null
                ))
                .collect(Collectors.toList());
    }
}
