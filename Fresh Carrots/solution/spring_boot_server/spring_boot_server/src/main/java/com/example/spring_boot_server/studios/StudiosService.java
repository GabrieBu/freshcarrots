package com.example.spring_boot_server.studios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudiosService {
    private final StudiosRepository studioRepository;

    @Autowired
    public StudiosService(StudiosRepository studioRepository) {this.studioRepository = studioRepository;}

    public List<Studios> findStudioByMovie(Integer movieId) {return  studioRepository.findByMovie(movieId);}
}
