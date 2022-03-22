package stud.carcredit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stud.carcredit.model.Role;

public interface RoleRepo extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
