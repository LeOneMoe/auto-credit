package stud.carcredit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stud.carcredit.dao.LoanDao;
import stud.carcredit.exceptions.NotFoundException;
import stud.carcredit.model.Loan;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("loans")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LoanController {
    private final LoanDao loanDao;

    @Autowired
    public LoanController(LoanDao loanDao) {
        this.loanDao = loanDao;
    }

    @GetMapping
    public List<Loan> getAll(Loan loan) {
        return loanDao.findAll();
    }


    @GetMapping("{id}")
    public Optional<Loan> getById(@PathVariable("id") Long id) {
        return Optional.ofNullable(loanDao.findById(id)
                .orElseThrow(() -> new NotFoundException("LoanId: " + id + " not found")));
    }

    @PostMapping
    public Loan create(@Valid @RequestBody Loan loan) {
        return loanDao.save(loan);
    }

    @PutMapping("{id}")
    public Loan update(
            @PathVariable Long id,
            @Valid @RequestBody Loan loanRequest
    ) {
        return loanDao.findById(id).map(loan -> {
            loan.setTotalSum(loanRequest.getTotalSum());

            return loanDao.save(loan);
        }).orElseThrow(() -> new NotFoundException("LoanId: " + id + " not found"));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return loanDao.findById(id).map(loan -> {
            loanDao.delete(loan);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new NotFoundException("LoanId: " + id + " not found"));
    }
}
