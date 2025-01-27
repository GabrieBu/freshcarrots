package com.example.spring_boot_server.themes;
import jakarta.persistence.*;

@Entity
@Table(name="themes")
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_film", nullable = false, columnDefinition = "BIGINT")
    private Long id_film;
    @Column(name = "theme", columnDefinition = "TEXT")
    private String theme;

    public Theme() {}

    public Theme(Long id_film, String themes) {
        this.id_film = id_film;
        this.theme = themes;
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

    public String getThemes() {
        return theme;
    }

    public void setThemes(String themes) {
        this.theme = themes;
    }
}
