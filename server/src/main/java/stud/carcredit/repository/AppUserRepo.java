package stud.carcredit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stud.carcredit.model.AppUser;

public interface AppUserRepo extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);
}
