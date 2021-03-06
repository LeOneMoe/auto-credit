package stud.carcredit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import stud.carcredit.model.Loan;

import java.util.List;

@Repository
public interface LoanRepo extends JpaRepository<Loan, Long> {

    @Query(
            "select l from Loan l " +
                    "where (:creditNumber is null or l.creditNumber like concat('%', cast(:creditNumber as text), '%')) " +
                    "and (:carId is null or l.carId = :carId) " +
                    "and :clientId = l.clientId"
    )
    List<Loan> find(@Param("creditNumber") String creditNumber, @Param("carId") Long carId, @Param("clientId") Long clientId);
}
