package stud.carcredit.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stud.carcredit.exceptions.NotFoundException;
import stud.carcredit.model.Loan;
import stud.carcredit.repository.CarRepo;
import stud.carcredit.repository.ClientRepo;
import stud.carcredit.repository.LoanRepo;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class LoanController {
    private final LoanRepo loanRepo;
    private final CarRepo carRepo;
    private final ClientRepo clientRepo;

    @GetMapping("clients/{clientId}/loans")
    public List<Loan> find(
            Loan loan,
            @PathVariable("clientId") Long clientId
    ) {
        return loanRepo.find(
                loan.getCreditNumber(),
                loan.getCarId(),
                clientId
        );
    }

    @GetMapping("clients/{clientId}/loans/{loanId}")
    public Optional<Loan> getById(@PathVariable("loanId") Long id) {
        return Optional.ofNullable(loanRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("LoanId: " + id + " not found")));
    }

    @PostMapping("clients/{clientId}/loans/")
    public Loan create(
            @Valid @RequestBody Loan loan,
            @PathVariable("clientId") Long clientId
    ) {
        loan.setClientId(clientId);
        loan.setClient(clientRepo.findById(clientId).get());
        loan.setCar(carRepo.findById(loan.getCarId()).get());

        return loanRepo.save(loan);
    }

    @PutMapping("clients/{clientId}/loans/{loanId}")
    public Loan update(
            @PathVariable("loanId") Long loanId,
            @RequestBody Loan loanRequest
    ) {

        return loanRepo.findById(loanId).map(loan -> {
            loan.setCreditNumber(loanRequest.getCreditNumber());
            loan.setStartDate(loanRequest.getStartDate());
            loan.setTotalSum(loanRequest.getTotalSum());
            loan.setCar(carRepo.findById(loanRequest.getCarId()).get());
            loan.setCarId(loanRequest.getCarId());

            return loanRepo.save(loan);
        }).orElseThrow(() -> new NotFoundException("LoanId: " + loanId + " not found"));
    }

    @DeleteMapping("clients/{clientId}/loans/{loanId}")
    public ResponseEntity<?> delete(@PathVariable("loanId") Long id) {
        return loanRepo.findById(id).map(loan -> {
            loanRepo.delete(loan);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new NotFoundException("LoanId: " + id + " not found"));
    }
}
