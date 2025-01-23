package com.example.spring_boot_server.movies;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table
public class Movie {
    @Id
    @Column(name = "id", nullable = false, columnDefinition = "BIGINT")
    private Long id;
    @Column(name = "name", columnDefinition = "TEXT")
    private String name;
    @Column(name = "date", columnDefinition = "TIMESTAMP")
    private LocalDate date;
    @Column(name = "tagline", columnDefinition = "TEXT")
    private String tagline;
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    @Column(name = "minute", columnDefinition = "REAL") //change in DOUBLE PRECISION
    private Float minute;
    @Column(name = "rating", columnDefinition = "REAL")
    private Float rating;

    public Movie() {}

    public Movie(Long id, String name, LocalDate date, String tagline, String description, Float minute, Float rating) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.tagline = tagline;
        this.description = description;
        this.minute = minute;
        this.rating = rating;
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
