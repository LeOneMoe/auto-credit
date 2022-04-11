package stud.carcredit.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stud.carcredit.exceptions.NotFoundException;
import stud.carcredit.model.Client;
import stud.carcredit.repository.ClientRepo;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("clients")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class ClientController {
    private final ClientRepo clientRepo;


    @GetMapping
    public List<Client> find(Client client) {
        return clientRepo.find(
                client.getName(),
                client.getPassportNumber(),
                client.getNationality()
        );
    }


    @GetMapping("{id}")
    public Optional<Client> getById(@PathVariable("id") Long id) {
        return Optional.ofNullable(clientRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("ClientId: " + id + " not found")));
    }

    @PostMapping
    public Client create(@Valid @RequestBody Client client) {
        return clientRepo.save(client);
    }

    @PutMapping("{id}")
    public Client update(
            @PathVariable Long id,
            @Valid @RequestBody Client clientRequest
    ) {
        return clientRepo.findById(id).map(client -> {
            client.setName(clientRequest.getName());
            client.setDateOfBirth(clientRequest.getDateOfBirth());
            client.setPassportNumber(clientRequest.getPassportNumber());
            client.setNationality(clientRequest.getNationality());

            return clientRepo.save(client);
        }).orElseThrow(() -> new NotFoundException("ClientId: " + id + " not found"));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return clientRepo.findById(id).map(client -> {
            clientRepo.delete(client);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new NotFoundException("ClientId: " + id + " not found"));
    }
}
