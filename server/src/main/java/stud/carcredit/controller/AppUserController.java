package stud.carcredit.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import stud.carcredit.model.AppUser;
import stud.carcredit.model.Role;
import stud.carcredit.security.utils.AlgorithmConstructor;
import stud.carcredit.service.AppUserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static stud.carcredit.security.Constants.TOKEN_PREFIX;
import static stud.carcredit.security.utils.HeaderWriter.writeSuccessfulAuthResponse;
import static stud.carcredit.security.utils.HeaderWriter.writeUnsuccessfulAuthResponse;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@Slf4j
public class AppUserController {
    private final AppUserService appUserService;

    @GetMapping("/users")
    public ResponseEntity<List<AppUser>> getAllUsers() {
        return ResponseEntity.ok().body(appUserService.getAppUsers());
    }

    @PostMapping("/users")
    public ResponseEntity<AppUser> createUser(@RequestBody AppUser appUser) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users").toUriString());

        return ResponseEntity.created(uri).body(appUserService.saveAppUser(appUser));
    }

    @PostMapping("/roles")
    public ResponseEntity<Role> createRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/roles").toUriString());
        return ResponseEntity.created(uri).body(appUserService.saveRole(role));
    }

    @PostMapping("/users/addrole")
    public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUserForm form) {
        appUserService.addRoleToAppUser(form.getUsername(), form.getRoleName());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);

        if (authorizationHeader != null && authorizationHeader.startsWith(TOKEN_PREFIX)) {
            try {
                String refreshToken = authorizationHeader.substring(TOKEN_PREFIX.length());

                Algorithm algorithm = AlgorithmConstructor.getAlgorithm();
                JWTVerifier verifier = JWT.require(algorithm).build();

                DecodedJWT decodedJWT = verifier.verify(refreshToken);

                String username = decodedJWT.getSubject();
                AppUser appUser = appUserService.getAppUser(username);

                Date expiresIn = new Date(System.currentTimeMillis() + 30 * 60 * 1000); // 30 minutes

                List<String> roles = appUser.getRoles().stream().map(Role::getName).collect(Collectors.toList());

                String accessToken = JWT.create()
                        .withSubject(appUser.getUsername())
                        .withIssuedAt(new Date(System.currentTimeMillis()))
                        .withExpiresAt(expiresIn)
                        .withIssuer(request.getRequestURI())
                        .withClaim("user", appUser.getUsername())
                        .withClaim("roles", roles)
                        .sign(algorithm);

                writeSuccessfulAuthResponse(response, expiresIn, accessToken, refreshToken, appUser.getUsername(), roles);

                log.info("Successful token refresh for User: {}", appUser.getUsername());
            } catch (Exception e) {
                log.error("Error logging in: {}", e.getMessage());

                writeUnsuccessfulAuthResponse(response, e);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }
}

@Data
class RoleToUserForm {
    private String username;
    private String roleName;
}
