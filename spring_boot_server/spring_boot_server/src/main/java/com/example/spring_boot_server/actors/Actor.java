package com.example.spring_boot_server.actors;

import jakarta.persistence.*;

@Entity
@Table(name="actors")
public class Actor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_film", nullable = false, columnDefinition = "BIGINT")
    private Long id_film;
    @Column(name = "name", nullable = false, columnDefinition = "TEXT")
    private String name;
    @Column(name = "role", nullable = false, columnDefinition = "TEXT")
    private String role;

    // Default constructor
    public Actor() {
    }

    // Constructor with all fields
    public Actor(Long id_film, String name, String role) {
        this.id_film = id_film;
        this.name = name;
        this.role = role;
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

    public Long getId_film() {
        return id_film;
    }

    public void setId_film(Long id_film) {
        this.id_film = id_film;
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
