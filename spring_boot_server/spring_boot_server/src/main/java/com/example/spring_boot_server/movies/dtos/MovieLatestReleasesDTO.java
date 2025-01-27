package com.example.spring_boot_server.movies.dtos;

import java.time.LocalDate;

public class MovieLatestReleasesDTO {
    private Long id;
    private String name;
    private LocalDate releaseDate;
    private String link;

    public MovieLatestReleasesDTO(Long id, String name, LocalDate releaseDate, String link) {
        this.id = id;
        this.name = name;
        this.releaseDate = releaseDate;
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

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
