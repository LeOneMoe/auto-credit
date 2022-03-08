package stud.carcredit.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stud.carcredit.model.Summit;

import java.util.List;

@Repository
public interface SummitDao extends JpaRepository<Summit, Long> {
    List<Summit> findAllByMainland(String mainLand);
}
