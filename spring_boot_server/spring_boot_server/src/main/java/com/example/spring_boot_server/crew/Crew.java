package com.example.spring_boot_server.crew;
import jakarta.persistence.*;


@Entity
@Table(name="crews")
public class Crew {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_film", nullable = false, columnDefinition = "BIGINT")
    private Long id_film;
    @Column(name = "role", columnDefinition = "TEXT")
    private String role;
    @Column(name = "name", columnDefinition = "TEXT")
    private String name;

    public Crew() {

    }

    public Crew(Long id_film, String role, String name) {
        this.id_film = id_film;
        this.role = role;
        this.name = name;
    }


    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getId_film() {
        return id_film;
    }

    public void setId_film(Long id_film) {
        this.id_film = id_film;
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
}
