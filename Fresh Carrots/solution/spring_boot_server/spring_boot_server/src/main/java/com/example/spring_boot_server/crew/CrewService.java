package com.example.spring_boot_server.crew;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CrewService {
    private final CrewRepository crewRepository;

    @Autowired
    public CrewService(CrewRepository crewRepository) {
        this.crewRepository = crewRepository;
    }

    public List<Crew> findCrewByMovie(Integer movieId) {
        return crewRepository.findByMovie(movieId);
    }
}
