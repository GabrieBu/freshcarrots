package com.example.spring_boot_server.movies.dtos;

public class MovieByNameDTO {
    private Long id;
    private String name;
    private Float year;
    private String poster;

    public MovieByNameDTO() {}

    public MovieByNameDTO(Long id, String name, Float year, String poster) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.poster = poster;
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
        return year;
    }

    public void setYear(Float year) {
        this.year = year;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }
}
