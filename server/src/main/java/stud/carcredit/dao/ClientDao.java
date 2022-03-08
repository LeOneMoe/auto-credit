package stud.carcredit.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import stud.carcredit.model.Client;

import java.util.List;

public interface ClientDao extends JpaRepository<Client, Long> {
    @Query(
            "select c from Client c " +
                    "where (:name is null or c.name like concat('%', :name, '%')) " +
                    "and (:passportNumber is null or c.passportNumber like concat('%', :passportNumber, '%')) " +
                    "and (:nationality is null or c.nationality = :nationality)"
    )
    List<Client> find(@Param("name") String name, @Param("passportNumber") String passportNumber, @Param("nationality") String nationality);
}
