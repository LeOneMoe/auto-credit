package stud.carcredit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stud.carcredit.dao.SummitDao;
import stud.carcredit.exceptions.NotFoundException;
import stud.carcredit.model.Summit;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("summits")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SummitController {
    private final SummitDao summitDao;

    @Autowired
    public SummitController(SummitDao summitDao) {
        this.summitDao = summitDao;
    }

    @GetMapping
    public List<Summit> getAll() {
        return summitDao.findAll();
    }

    @GetMapping("{id}")
    public Optional<Summit> getById(@PathVariable("id") Long id) {
        return Optional.ofNullable(summitDao.findById(id)
                .orElseThrow(() -> new NotFoundException("SummitId: " + id + " not found")));
    }

    @PostMapping
    public Summit create(@Valid @RequestBody Summit summit) {
        return summitDao.save(summit);
    }

    @PutMapping("{id}")
    public Summit update(
            @PathVariable Long id,
            @RequestBody Summit summitRequest
    ) {
        return summitDao.findById(id).map(summit -> {
            summit.setMainland(summitRequest.getMainland());
            summit.setLatitude(summitRequest.getLatitude());
            summit.setLongitude(summitRequest.getLongitude());
            summit.setHeight(summitRequest.getHeight());

            return summitDao.save(summit);
        }).orElseThrow(() -> new NotFoundException("SummitId: " + id + " not found"));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return summitDao.findById(id).map(summit -> {
            summitDao.delete(summit);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new NotFoundException("SummitId: " + id + " not found"));
    }
}
