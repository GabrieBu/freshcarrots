package com.example.spring_boot_server.genres.dtos;

public class GenreNameDTO {
    private final String genreName;

    public GenreNameDTO(String genreName) {
        this.genreName = genreName;
    }

    public String getGenreName() {
        return genreName;
    }
}
