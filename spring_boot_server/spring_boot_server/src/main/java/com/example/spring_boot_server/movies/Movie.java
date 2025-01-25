package com.example.spring_boot_server.movies;
import com.example.spring_boot_server.posters.Poster;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="movies")
public class Movie {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "name", nullable = true)
    private String name;
    @Column(name = "date", nullable = true)
    private LocalDate date;
    @Column(name = "tagline", nullable = true)
    private String tagline;
    @Column(name = "description",nullable = true)
    private String description;
    @Column(name = "minute", nullable = true)
    private Float minute;
    @Column(name = "rating", nullable = true)
    private Float rating;
    @JoinColumn
    @OneToOne(mappedBy = "movie", cascade = CascadeType.ALL)
    private Poster poster;


    public Movie() {}

    public Movie(Long id, String name, LocalDate date, String tagline, String description, Float minute, Float rating, Poster poster) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.tagline = tagline;
        this.description = description;
        this.minute = minute;
        this.rating = rating;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getMinute() {
        return minute;
    }

    public void setMinute(Float minute) {
        this.minute = minute;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }
}
