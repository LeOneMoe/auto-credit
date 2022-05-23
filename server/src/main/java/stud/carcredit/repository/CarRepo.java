package stud.carcredit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import stud.carcredit.model.Car;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarRepo extends JpaRepository<Car, Long> {
    @Query(
            "select c from Car c " +
                    "where (:brand is null or c.brand like concat('%', cast(:brand as text), '%')) " +
                    "and (:model is null or c.model like concat('%', cast(:model as text), '%')) " +
                    "and (:number is null or c.number like concat('%', cast(:number as text), '%')) " +
                    "and :clientId = c.clientId"
    )
    List<Car> find(
            @Param("brand") String brand,
            @Param("model") String model,
            @Param("number") String number,
            @Param("clientId") Long clientId
    );

    @Query(
            "select c from Car c " +
                    "left join Loan l on c.id = l.carId " +
                    "where l.carId is null " +
                    "and c.clientId = :clientId or c.id = :carId"
    )
    List<Car> findUnused(@Param("clientId") Long clientId, @Param("carId") Long carId);

    Optional<List<Car>> findByClientId(Long clientId);
}
