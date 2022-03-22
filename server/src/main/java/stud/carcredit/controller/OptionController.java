package stud.carcredit.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import stud.carcredit.model.Nationality;
import stud.carcredit.repository.NationalityRepo;

import java.util.List;

@RestController
@RequestMapping("options")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class OptionController {
    private final NationalityRepo nationalityRepo;

    @GetMapping("nationality")
    public List<Nationality> getNationalityOptions(String key) {
        if (key != null) {
            return nationalityRepo.findAllByKey(key);
        }

        return nationalityRepo.findAll();
    }
}
