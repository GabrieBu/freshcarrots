package com.example.spring_boot_server.posters;

import com.example.spring_boot_server.movies.Movie;
import jakarta.persistence.*;

@Entity
@Table(name = "posters")
public class Poster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "id_film", referencedColumnName = "id", nullable = false, columnDefinition = "BIGINT")
    private Movie movie;
    @Column(name = "link", columnDefinition = "TEXT")
    private String link;


    public Poster(){

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
