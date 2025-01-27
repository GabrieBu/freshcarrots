package com.example.spring_boot_server.movies;
import com.example.spring_boot_server.actors.Actor;
import com.example.spring_boot_server.genres.Genre;
import com.example.spring_boot_server.posters.Poster;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "movies")
public class Movie {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "date")
    private Float date;
    @Column(name = "tagline")
    private String tagline;
    @Column(name = "description")
    private String description;
    @Column(name = "minute")
    private Float minute;
    @Column(name = "rating")
    private Float rating;
    @OneToOne(mappedBy = "movie", cascade = CascadeType.ALL)
    private Poster poster;
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Genre> genres;

    public Movie() {}

    public Movie(Long id, String name, Float date, String tagline, String description, Float minute, Float rating, Poster poster, List<Genre> genres) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.tagline = tagline;
        this.description = description;
        this.minute = minute;
        this.rating = rating;
        this.poster = poster;
        this.genres = genres;
    }

    @Override
    public String toString() {
        System.out.println("Movie");
        for (Genre genre : genres) {
            System.out.println(genre);
        }
        return "Movie{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", date=" + date +
                ", tagline='" + tagline + '\'' +
                ", description='" + description + '\'' +
                ", minute=" + minute +
                ", rating=" + rating +
                ", poster=" + (poster != null ? poster.getId() : "null") +
                ", genress=" + (genres != null ? "listgen" : "null") +
                '}';
    }

    public Poster getPoster() {
        return poster;
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

    public Float getDate() {
        return date;
    }

    public void setDate(Float date) {
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
