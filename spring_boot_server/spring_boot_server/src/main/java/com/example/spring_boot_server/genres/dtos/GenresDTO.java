package com.example.spring_boot_server.genres.dtos;

public class GenresDTO {
    private Long id;
    private String genre;

    public GenresDTO(Long id, String genre) {
        this.id = id;
        this.genre = genre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
