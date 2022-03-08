package stud.carcredit.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stud.carcredit.model.SummitAlp;

import java.util.List;
import java.util.Optional;

@Repository
public interface SummitAlpDao extends JpaRepository<SummitAlp, Long> {
    List<SummitAlp> findBySummitId(Long summitId);
    Optional<SummitAlp> findByIdAndSummitId(Long id, Long summitId);
}
