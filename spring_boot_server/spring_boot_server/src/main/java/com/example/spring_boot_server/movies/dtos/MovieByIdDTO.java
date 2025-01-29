package com.example.spring_boot_server.movies.dtos;

import com.example.spring_boot_server.actors.dtos.ActorDTO;
import com.example.spring_boot_server.crew.dtos.CrewDTO;

import java.util.List;

public class MovieByIdDTO {
    private Long id;
    private String name;
    private Float date;
    private String tagline;
    private String description;
    private Float minute;
    private Float rating;
    private String link;
    private List<String> genres;
    private List<String> studios;
    private List<CrewDTO> crew;
    private List<ActorDTO> actors;
    private List<String> themes;

    public MovieByIdDTO() {}

    public MovieByIdDTO(Long id, String name, Float date, String tagline, String description, Float minute, Float rating, String link, List<String> genres, List<String> studios, List<CrewDTO> crew, List<ActorDTO> actors, List<String> themes) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.tagline = tagline;
        this.description = description;
        this.minute = minute;
        this.rating = rating;
        this.link = link;
        this.genres = genres;
        this.studios = studios;
        this.crew = crew;
        this.actors = actors;
        this.themes = themes;
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

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public List<String> getStudios() {
        return studios;
    }

    public void setStudios(List<String> studios) {
        this.studios = studios;
    }

    public List<CrewDTO> getCrew() {
        return crew;
    }

    public void setCrew(List<CrewDTO> crew) {
        this.crew = crew;
    }

    public List<ActorDTO> getActors() {
        return actors;
    }

    public void setActors(List<ActorDTO> actors) {
        this.actors = actors;
    }

    public List<String> getThemes() {
        return themes;
    }

    public void setThemes(List<String> themes) {
        this.themes = themes;
    }
}
