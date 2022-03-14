package stud.carcredit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stud.carcredit.dao.CarDao;
import stud.carcredit.dao.ClientDao;
import stud.carcredit.exceptions.NotFoundException;
import stud.carcredit.model.Car;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CarController {
    private final CarDao carDao;
    private final ClientDao clientDao;

    @Autowired
    public CarController(CarDao carDao, ClientDao clientDao) {
        this.carDao = carDao;
        this.clientDao = clientDao;
    }

    @GetMapping
    public List<Car> getAll(Car car) {
        return carDao.find(
                car.getBrand(),
                car.getModel(),
                car.getNumber()
        );
    }

    @GetMapping("clients/{clientId}/cars")
    public List<Car> findAllByClientId(@PathVariable Long clientId) {
        return carDao.findByClientId(clientId)
                .orElseThrow(() -> new NotFoundException("ClientId: " + clientId + " not found"));
    }

    @GetMapping("clients/{clientId}/cars/{carId}")
    public Optional<Car> getById(@PathVariable Long clientId, @PathVariable Long carId) {
        return Optional.ofNullable(carDao.findById(carId)
                .orElseThrow(() -> new NotFoundException("CarId: " + carId + " not found")));
    }

    @PostMapping("clients/{clientId}/cars")
    public Car create(@RequestBody Car car, @PathVariable Long clientId) {

        return clientDao.findById(clientId).map(client -> {
            car.setClient(client);

            return carDao.save(car);
        }).orElseThrow(() -> new NotFoundException("ClientId: " + clientId + " not found"));
    }

    @PutMapping("{id}")
    public Car update(
            @PathVariable Long id,
            @Valid @RequestBody Car carRequest
    ) {
        return carDao.findById(id).map(car -> {
            car.setBrand(carRequest.getBrand());
            car.setModel(carRequest.getModel());
            car.setNumber(carRequest.getNumber());
            car.setDateOfPurchase(carRequest.getDateOfPurchase());

            return carDao.save(car);
        }).orElseThrow(() -> new NotFoundException("CarId: " + id + " not found"));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return carDao.findById(id).map(car -> {
            carDao.delete(car);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new NotFoundException("CarId: " + id + " not found"));
    }
}
