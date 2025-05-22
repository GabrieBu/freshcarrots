package com.example.spring_boot_server.posters;

import com.example.spring_boot_server.movies.Movie;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "posters")
public class Poster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "link", columnDefinition = "TEXT")
    private String link;
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_film", referencedColumnName = "id")
    @JsonBackReference
    private Movie movie;

    public Poster(Long id, String link, Movie movie) {
        this.id = id;
        this.movie = movie;
        this.link = link;
    }

    public Poster() {}

    public String getLink(){
        return link;
    }

    public void setLink(String link){
        this.link = link;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return link;
    }

    public void setType(String type) {
        this.link = type;
    }
}
