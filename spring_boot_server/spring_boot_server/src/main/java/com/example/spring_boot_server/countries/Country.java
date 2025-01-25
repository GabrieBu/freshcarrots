package com.example.spring_boot_server.countries;

import jakarta.persistence.*;


@Entity
@Table
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_film", nullable = false, columnDefinition = "BIGINT")
    private Long id_film;
    @Column(name = "country", nullable = false, columnDefinition = "TEXT")
    private String country;

    // Default constructor
    public Country() {
    }

    public Country(Long id_film, String country) {
        this.id_film = id_film;
        this.country = country;
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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
