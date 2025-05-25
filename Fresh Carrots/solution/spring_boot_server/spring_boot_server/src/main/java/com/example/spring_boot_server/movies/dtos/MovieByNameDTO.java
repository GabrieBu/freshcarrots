package com.example.spring_boot_server.movies.dtos;

public class MovieByNameDTO {
    private Long id;
    private String name;
    private Float date;
    private String link;

    public MovieByNameDTO() {}

    public MovieByNameDTO(Long id, String name, Float date, String link) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.link = link;
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

    public Float getYear() {
        return date;
    }

    public void setYear(Float date) {
        this.date = date;
    }

    public String getPoster() {
        return link;
    }

    public void setPoster(String link) {
        this.link = link;
    }
}
