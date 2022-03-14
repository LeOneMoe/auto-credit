package stud.carcredit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stud.carcredit.dao.CarDao;
import stud.carcredit.dao.LoanDao;
import stud.carcredit.exceptions.NotFoundException;
import stud.carcredit.model.Loan;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LoanController {
    private final LoanDao loanDao;
    private final CarDao carDao;

    @Autowired
    public LoanController(LoanDao loanDao, CarDao carDao) {
        this.loanDao = loanDao;
        this.carDao = carDao;
    }

    @GetMapping("clients/{clientId}/loans")
    public List<Loan> getAll(@PathVariable("clientId") Long clientId) {


        return loanDao.findByClientId(clientId);
    }


    @GetMapping("clients/{clientId}/loans/{loanId}")
    public Optional<Loan> getById(@PathVariable("loanId") Long id) {
        return Optional.ofNullable(loanDao.findById(id)
                .orElseThrow(() -> new NotFoundException("LoanId: " + id + " not found")));
    }

    @PostMapping
    public Loan create(@Valid @RequestBody Loan loan) {
        return loanDao.save(loan);
    }

    @PutMapping("clients/{clientId}/loans/{loanId}")
    public Loan update(
            @PathVariable("loanId") Long loanId,
            @RequestBody Loan loanRequest
    ) {

        return loanDao.findById(loanId).map(loan -> {
            loan.setCreditNumber(loanRequest.getCreditNumber());
            loan.setStartDate(loanRequest.getStartDate());
            loan.setTotalSum(loanRequest.getTotalSum());
            loan.setCar(carDao.findById(loanRequest.getCarId()).get());
            loan.setCarId(loanRequest.getCarId());

            return loanDao.save(loan);
        }).orElseThrow(() -> new NotFoundException("LoanId: " + loanId + " not found"));
    }

    @DeleteMapping("clients/{clientId}/loans/{loanId}")
    public ResponseEntity<?> delete(@PathVariable("loanId") Long id) {
        return loanDao.findById(id).map(loan -> {
            loanDao.delete(loan);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new NotFoundException("LoanId: " + id + " not found"));
    }
}
