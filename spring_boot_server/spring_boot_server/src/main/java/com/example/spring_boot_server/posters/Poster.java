package com.example.spring_boot_server.posters;

import jakarta.persistence.*;

@Entity
@Table
public class Poster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_film", nullable = false, columnDefinition = "BIGINT")
    private Long id_film;
    @Column(name = "link", columnDefinition = "TEXT")
    private String link;

    public Poster(){

    }

    public Poster(Long id_film, String type) {
        this.id_film = id_film;
        this.link = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId_film() {
        return id_film;
    }

    public void setId_film(Long id_film) {
        this.id_film = id_film;
    }

    public String getType() {
        return link;
    }

    public void setType(String type) {
        this.link = type;
    }
}
