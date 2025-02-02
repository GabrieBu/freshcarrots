package com.example.spring_boot_server.themes;
import com.example.spring_boot_server.movies.Movie;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name="themes")
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "theme", columnDefinition = "TEXT")
    private String theme;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_film", referencedColumnName = "id")
    @JsonBackReference
    private Movie movie;

    public Theme() {}

    public Theme(Long id, String themes, Movie movie) {
        this.id = id;
        this.theme = themes;
        this.movie = movie;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getTheme() {
        return theme;
    }

    public void setThemes(String themes) {
        this.theme = themes;
    }
}
