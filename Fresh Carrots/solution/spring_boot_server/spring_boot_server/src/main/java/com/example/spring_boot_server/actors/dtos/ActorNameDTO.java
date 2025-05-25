package com.example.spring_boot_server.actors.dtos;

public class ActorNameDTO {
    private Long id;
    private String name;

    public ActorNameDTO() {}

    public ActorNameDTO(Long id, String name) {
        this.id = id;
        this.name = name;
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
