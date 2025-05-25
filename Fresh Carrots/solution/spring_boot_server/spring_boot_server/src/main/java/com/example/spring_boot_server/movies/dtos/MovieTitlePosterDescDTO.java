package com.example.spring_boot_server.movies.dtos;

public class MovieTitlePosterDescDTO {
    private Long id;
    private String name;
    private String description;
    private final String link;
    private Float rating;

    public MovieTitlePosterDescDTO(Long id, String name, String description, Float rating, String link) {
        this.id = id;
        this.name = name;
        this.link = link;
        this.description = description;
        this.rating = rating;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLink() {
        return link;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }
}
