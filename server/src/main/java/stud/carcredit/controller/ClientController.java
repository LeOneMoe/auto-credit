package stud.carcredit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stud.carcredit.dao.ClientDao;
import stud.carcredit.exceptions.NotFoundException;
import stud.carcredit.model.Client;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("clients")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ClientController {
    private final ClientDao clientDao;

    @Autowired
    public ClientController(ClientDao clientDao) {
        this.clientDao = clientDao;
    }

    @GetMapping
    public List<Client> find(Client client) {
        System.out.println(client.toString());

        return clientDao.find(
                client.getName(),
                client.getPassportNumber(),
                client.getNationality()
        );
    }


    @GetMapping("{id}")
    public Optional<Client> getById(@PathVariable("id") Long id) {
        return Optional.ofNullable(clientDao.findById(id)
                .orElseThrow(() -> new NotFoundException("ClientId: " + id + " not found")));
    }

    @PostMapping
    public Client create(@Valid @RequestBody Client client) {
        System.out.println(client.toString());

        return clientDao.save(client);
    }

    @PutMapping("{id}")
    public Client update(
            @PathVariable Long id,
            @Valid @RequestBody Client clientRequest
    ) {
        return clientDao.findById(id).map(client -> {
            client.setName(clientRequest.getName());
            client.setDateOfBirth(clientRequest.getDateOfBirth());
            client.setPassportNumber(clientRequest.getPassportNumber());
            client.setNationality(clientRequest.getNationality());

            return clientDao.save(client);
        }).orElseThrow(() -> new NotFoundException("ClientId: " + id + " not found"));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return clientDao.findById(id).map(client -> {
            clientDao.delete(client);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new NotFoundException("ClientId: " + id + " not found"));
    }
}
