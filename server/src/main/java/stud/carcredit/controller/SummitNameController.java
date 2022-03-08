package stud.carcredit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stud.carcredit.dao.SummitDao;
import stud.carcredit.dao.SummitNameDao;
import stud.carcredit.model.SummitName;
import stud.carcredit.exceptions.NotFoundException;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SummitNameController {
    private final SummitNameDao summitNameDao;
    private final SummitDao summitDao;

    @Autowired
    public SummitNameController(SummitNameDao summitNameDao, SummitDao summitDao) {
        this.summitNameDao = summitNameDao;
        this.summitDao = summitDao;
    }

    @GetMapping("summits/{summitId}/names")
    public List<SummitName> findAllBySummitId(
            @PathVariable("summitId") Long summitId
    ) {
        return summitNameDao.findBySummitId(summitId);
    }

    @PostMapping("summits/{summitId}/names")
    public SummitName create(
            @PathVariable("summitId") Long summitId,
            @Valid @RequestBody SummitName summitName
    ) {
        return summitDao.findById(summitId).map(summit -> {
            summitName.setSummit(summit);
            return summitNameDao.save(summitName);
        }).orElseThrow(() -> new NotFoundException("SummitId: " + summitId + " not found"));
    }

    @PutMapping("summits/{summitId}/names/{nameId}")
    public SummitName update(
            @PathVariable("summitId") Long summitId,
            @PathVariable("nameId") Long nameId,
            @Valid @RequestBody SummitName summitNameRequest
    ) {
        if (!summitDao.existsById(summitId)) {
            throw new NotFoundException("SummitId: " + summitId + " not found");
        }

        return summitNameDao.findById(nameId).map(summitName -> {
            summitName.setSummitName(summitNameRequest.getSummitName());
            return summitNameDao.save(summitName);
        }).orElseThrow(() -> new NotFoundException("NameId: " + nameId + " not found"));
    }

    @DeleteMapping("summits/{summitId}/names/{nameId}")
    public ResponseEntity<?> delete(
            @PathVariable("summitId") Long summitId,
            @PathVariable("nameId") Long nameId
    ) {
        return summitNameDao.findByIdAndSummitId(nameId, summitId).map(summitName -> {
            summitNameDao.delete(summitName);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new NotFoundException("SummitName not found with id " + nameId + " and SummitId " + summitId));
    }
}
