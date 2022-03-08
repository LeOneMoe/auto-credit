package stud.carcredit.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import stud.carcredit.model.Nationality;

import java.util.List;

public interface NationalityDao extends JpaRepository<Nationality, Long> {
    List<Nationality> findAllByKey(String key);
}
