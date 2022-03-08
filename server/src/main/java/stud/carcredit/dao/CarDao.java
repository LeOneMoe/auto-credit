package stud.carcredit.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import stud.carcredit.model.Car;
import stud.carcredit.model.Client;

import java.util.List;
import java.util.Optional;

public interface CarDao extends JpaRepository<Car, Long> {
    @Query(
            "select c from Car c " +
                    "where :brand is null or c.brand like concat('%', :brand, '%') " +
                    "and :model is null or c.model like concat('%', :model, '%') " +
                    "and :number is null or c.number like concat('%', :number, '%')"
    )
    List<Car> find(@Param("brand") String brand, @Param("model") String model, @Param("number") String number);

    Optional<List<Car>> findByClientId(Long clientId);
}
