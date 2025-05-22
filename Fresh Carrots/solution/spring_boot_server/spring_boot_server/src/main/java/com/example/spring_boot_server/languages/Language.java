package com.example.spring_boot_server.languages;

import com.example.spring_boot_server.movies.Movie;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name="languages")
public class Language {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "type", columnDefinition = "TEXT")
    private String type;
    @Column(name = "language", columnDefinition = "TEXT")
    private String language;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_film", referencedColumnName = "id")
    @JsonBackReference
    private Movie movie;

    public Language() {}

    public Language(Long id, String type, String language, Movie movie) {
        this.id = id;
        this.type = type;
        this.language = language;
        this.movie = movie;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
