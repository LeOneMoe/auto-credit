package stud.carcredit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stud.carcredit.dao.NationalityDao;
import stud.carcredit.model.Nationality;

import java.util.List;

@RestController
@RequestMapping("options")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OptionController {
    private final NationalityDao nationalityDao;

    @Autowired
    public OptionController(NationalityDao nationalityDao) {
        this.nationalityDao = nationalityDao;
    }

    @GetMapping("nationality")
    public List<Nationality> getNationalityOptions(String key) {
        if (key != null) {
            return nationalityDao.findAllByKey(key);
        }

        return nationalityDao.findAll();
    }
}
