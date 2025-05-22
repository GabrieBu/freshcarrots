package com.example.spring_boot_server.actors;

import com.example.spring_boot_server.movies.Movie;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name="actors")
public class Actor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name", nullable = false, columnDefinition = "TEXT")
    private String name;
    @Column(name = "role", nullable = false, columnDefinition = "TEXT")
    private String role;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_film", referencedColumnName = "id", nullable = false)
    @JsonBackReference
    private Movie movie;

    // Default constructor
    public Actor() {
    }

    // Constructor with all fields
    public Actor(Long id, String name, String role, Movie movie) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.movie = movie;
    }

    public String toString(){
        return "Movie{" +
                "id=" + id +
                ", name='" + name + " - " + "role=" + role + "}";
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
