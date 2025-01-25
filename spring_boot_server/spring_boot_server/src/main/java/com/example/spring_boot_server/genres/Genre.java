package com.example.spring_boot_server.genres;

import jakarta.persistence.*;

@Entity
@Table
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_film", nullable = false, columnDefinition = "BIGINT")
    private Long id_film;
    @Column(name = "Genre", nullable = false, columnDefinition = "TEXT")
    private String Genre;


    public Genre() {}

    public Genre(Long id_film, String genre) {
        this.id_film = id_film;
        Genre = genre;
    }
    public Long getId_film() {
        return id_film;
    }

    public void setId_film(Long id_film) {
        this.id_film = id_film;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGenre() {
        return Genre;
    }

    public void setGenre(String genre) {
        Genre = genre;
    }


}
