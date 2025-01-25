package com.example.spring_boot_server.posters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PostersService {
    private final PostersRepository postersRepository;

    @Autowired
    public PostersService(PostersRepository postersRepository) {this.postersRepository = postersRepository;}

    public List<Poster> findPosterByMovie(Integer movieId) {return  postersRepository.findByMovie(movieId);}
}
