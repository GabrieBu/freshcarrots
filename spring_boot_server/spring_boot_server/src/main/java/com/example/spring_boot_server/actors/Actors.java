package com.example.spring_boot_server.actors;

import jakarta.persistence.*;

@Entity
@Table
public class Actors {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_film", nullable = false, columnDefinition = "BIGINT")
    private Long id_film;
    @Column(name = "name", nullable = false, columnDefinition = "TEXT")
    private String name;
    @Column(name = "role", nullable = false, columnDefinition = "TEXT")
    private String role;
    /*@Column(name = "date_of_birth", nullable = false)
    private LocalDate dob; // Maps to a DATE type in the database
    @Column(unique = true, nullable = false) // Define email as unique and non-null
    private String email;
    // Constructors, getters, setters, other methods...*/

    // Default constructor
    public Actors() {
    }

    // Constructor with all fields
    public Actors( Long id_film, String name, String role) {
        this.id_film = id_film;
        this.name = name;
        this.role = role;
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
