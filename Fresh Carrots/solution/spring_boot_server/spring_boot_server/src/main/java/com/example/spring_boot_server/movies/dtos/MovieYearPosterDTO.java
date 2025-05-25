package com.example.spring_boot_server.movies.dtos;

public class MovieYearPosterDTO {
    private Long id;
    private String name;
    private final String link;
    private Float date;

    public MovieYearPosterDTO(Long id, String name, String link, Float date) {
        this.id = id;
        this.name = name;
        this.link = link;
        this.date = date;
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

    public void setLink(String link) {
    }

    public void setDate(Float date) {
        this.date = date;
    }

    public Float getDate() {
        return date;
    }

}
