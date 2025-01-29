package com.example.spring_boot_server.crew;
import com.example.spring_boot_server.movies.Movie;
import jakarta.persistence.*;


@Entity
@Table(name="crew")
public class Crew {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "role", columnDefinition = "TEXT")
    private String role;
    @Column(name = "name", columnDefinition = "TEXT")
    private String name;
    @ManyToOne
    @JoinColumn(name = "id_film", referencedColumnName = "id", nullable = false)
    private Movie movie;

    public Crew() {

    }

    public Crew(Long id, String role, String name, Movie movie) {
        this.role = role;
        this.name = name;
        this.movie = movie;
    }


    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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
