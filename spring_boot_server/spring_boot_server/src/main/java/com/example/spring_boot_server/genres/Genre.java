package com.example.spring_boot_server.genres;

import com.example.spring_boot_server.movies.Movie;
import jakarta.persistence.*;

@Entity
@Table(name="genres")
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "genre", columnDefinition = "TEXT")
    private String genre;
    @ManyToOne
    @JoinColumn(name = "id_film", referencedColumnName = "id", nullable = false)
    private Movie movie;

    public Genre() {}

    public Genre(Long id, Movie movie, String genre) {
        this.id = id;
        this.movie = movie;
        this.genre = genre;
    }

    public String toString(){
        return "Genre{" +
                "id=" + id +
                ", genre='" + genre +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

}
