package stud.carcredit.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import stud.carcredit.model.Loan;

public interface LoanDao extends JpaRepository<Loan, Long> {
}
