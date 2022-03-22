package stud.carcredit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stud.carcredit.model.Nationality;

import java.util.List;

public interface NationalityRepo extends JpaRepository<Nationality, Long> {
    List<Nationality> findAllByKey(String key);
}
