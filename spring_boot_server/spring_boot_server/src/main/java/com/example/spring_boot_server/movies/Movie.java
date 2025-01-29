package com.example.spring_boot_server.movies;
import com.example.spring_boot_server.actors.Actor;
import com.example.spring_boot_server.crew.Crew;
import com.example.spring_boot_server.genres.Genre;
import com.example.spring_boot_server.languages.Language;
import com.example.spring_boot_server.posters.Poster;
import com.example.spring_boot_server.studios.Studios;
import com.example.spring_boot_server.studios.StudiosController;
import com.example.spring_boot_server.themes.Theme;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "movies")
public class Movie {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "date")
    private Float date;
    @Column(name = "tagline")
    private String tagline;
    @Column(name = "description")
    private String description;
    @Column(name = "minute")
    private Float minute;
    @Column(name = "rating")
    private Float rating;
    @OneToOne(mappedBy = "movie", cascade = CascadeType.ALL)
    private Poster poster;

    public List<Theme> getThemes() {
        return themes;
    }

    public void setThemes(List<Theme> themes) {
        this.themes = themes;
    }

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Genre> genres;
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Actor> actors;
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Studios> studios;
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Crew> crew;
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Language> languages;
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Theme> themes;


    public Movie() {}

    public Movie(Long id, String name, Float date, String tagline, String description, Float minute, Float rating, Poster poster, List<Genre> genres, List<Actor> actors, List<Crew> crew, List<Language> languages, List<Studios> studios) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.tagline = tagline;
        this.description = description;
        this.minute = minute;
        this.rating = rating;
        this.poster = poster;
        this.genres = genres;
        this.actors = actors;
        this.crew = crew;
        this.languages = languages;
        this.studios = studios;
    }

    public void setPoster(Poster poster) {
        this.poster = poster;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }

    public List<Actor> getActors() {
        return actors;
    }

    public void setActors(List<Actor> actors) {
        this.actors = actors;
    }

    public List<Studios> getStudios() {
        return studios;
    }

    public void setStudios(List<Studios> studios) {
        this.studios = studios;
    }

    public List<Crew> getCrew() {
        return crew;
    }

    public void setCrew(List<Crew> crew) {
        this.crew = crew;
    }

    public List<Language> getLanguages() {
        return languages;
    }

    public void setLanguages(List<Language> languages) {
        this.languages = languages;
    }

    public List<Genre> getGenres() {
        return genres;
    }

    public Poster getPoster() {
        return poster;
    }

    public String getPosterLink(){
        return poster.getLink();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getDate() {
        return date;
    }

    public void setDate(Float date) {
        this.date = date;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getMinute() {
        return minute;
    }

    public void setMinute(Float minute) {
        this.minute = minute;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }
}
