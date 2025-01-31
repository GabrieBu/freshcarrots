package com.example.spring_boot_server.movies.dtos;

public class MovieTitlePosterRatingDTO {
    private Long id;
    private String name;
    private String link;
    private Float rating;

    public MovieTitlePosterRatingDTO() {}

    public MovieTitlePosterRatingDTO(Long id, String name, String link, Float rating) {
        this.id = id;
        this.name = name;
        this.link = link;
        this.rating = rating;
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

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }
}
