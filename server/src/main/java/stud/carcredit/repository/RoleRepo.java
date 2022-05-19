package stud.carcredit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stud.carcredit.model.Role;
@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
