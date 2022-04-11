package stud.carcredit.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stud.carcredit.exceptions.NotFoundException;
import stud.carcredit.model.Car;
import stud.carcredit.repository.CarRepo;
import stud.carcredit.repository.ClientRepo;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class CarController {
    private final CarRepo carRepo;
    private final ClientRepo clientRepo;

    @GetMapping("clients/{clientId}/cars")
    public List<Car> find(
            Car car,
            @PathVariable Long clientId
    ) {
        return carRepo.find(
                car.getBrand(),
                car.getModel(),
                car.getNumber(),
                clientId
        );
    }

    @GetMapping("clients/{clientId}/cars/unused")
    public List<Car> findUnused(
            @PathVariable Long clientId,
            Long currentCar
    ) {
        return carRepo.findUnused(clientId, currentCar);
    }

    @GetMapping("clients/{clientId}/cars/{carId}")
    public Optional<Car> getById(@PathVariable Long clientId, @PathVariable Long carId) {
        return Optional.ofNullable(carRepo.findById(carId)
                .orElseThrow(() -> new NotFoundException("CarId: " + carId + " not found")));
    }

    @PostMapping("clients/{clientId}/cars")
    public Car create(@RequestBody Car car, @PathVariable Long clientId) {

        return clientRepo.findById(clientId).map(client -> {
            car.setClient(client);

            return carRepo.save(car);
        }).orElseThrow(() -> new NotFoundException("ClientId: " + clientId + " not found"));
    }

    @PutMapping("clients/{clientId}/cars/{carId}")
    public Car update(
            @Valid @RequestBody Car carRequest,
            @PathVariable Long carId
    ) {
        return carRepo.findById(carId).map(car -> {
            car.setBrand(carRequest.getBrand());
            car.setModel(carRequest.getModel());
            car.setNumber(carRequest.getNumber());
            car.setPrice(carRequest.getPrice());
            car.setDateOfPurchase(carRequest.getDateOfPurchase());

            return carRepo.save(car);
        }).orElseThrow(() -> new NotFoundException("CarId: " + carId + " not found"));
    }

    @DeleteMapping("clients/{clientId}/cars/{carId}")
    public ResponseEntity<?> delete(@PathVariable Long carId) {
        return carRepo.findById(carId).map(car -> {
            carRepo.delete(car);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new NotFoundException("CarId: " + carId + " not found"));
    }
}
