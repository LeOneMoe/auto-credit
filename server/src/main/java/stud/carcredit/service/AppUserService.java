package stud.carcredit.service;

import stud.carcredit.model.AppUser;
import stud.carcredit.model.Role;

import java.util.List;

public interface AppUserService {
    AppUser saveAppUser(AppUser appUser);

    Role saveRole(Role role);

    void addRoleToAppUser(String username, String roleName);

    AppUser getAppUser(String username);

    List<AppUser> getAppUsers();
}
