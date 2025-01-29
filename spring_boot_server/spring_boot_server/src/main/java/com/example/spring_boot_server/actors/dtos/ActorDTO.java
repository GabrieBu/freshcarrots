package com.example.spring_boot_server.actors.dtos;

public class ActorDTO {
    private String name;
    private String role;

    public ActorDTO() {
    }

    public ActorDTO(String name, String role) {
        this.name = name;
        this.role = role;
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
