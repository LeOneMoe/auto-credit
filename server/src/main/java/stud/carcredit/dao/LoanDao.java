package stud.carcredit.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import stud.carcredit.model.Client;
import stud.carcredit.model.Loan;

import java.util.List;

public interface LoanDao extends JpaRepository<Loan, Long> {
    List<Loan> findByClientId(Long client_id);
}
