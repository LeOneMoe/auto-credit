package stud.carcredit;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import stud.carcredit.model.AppUser;
import stud.carcredit.model.Role;
import stud.carcredit.service.AppUserService;

import java.util.ArrayList;

@SpringBootApplication
@EnableJpaAuditing
public class AutoCredit {
    public static void main(String[] args) {
        SpringApplication.run(AutoCredit.class, args);
    }

//    @Bean
//    public CorsFilter corsFilter() {
//        CorsConfiguration corsConfiguration = new CorsConfiguration();
//        corsConfiguration.setAllowCredentials(true);
//        corsConfiguration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
//        corsConfiguration.setAllowedHeaders(Arrays.asList(
//                "Origin",
//                "Access-Control-Allow-Origin",
//                "Content-Type",
//                "Accept",
//                "Authorization",
//                "Origin, Accept",
//                "X-Requested-With",
//                "Access-Control-Request-Method",
//                "Access-Control-Request-Headers"
//        ));
//        corsConfiguration.setExposedHeaders(Arrays.asList(
//                "Origin",
//                "Content-Type",
//                "Accept",
//                "Authorization",
//                "Access-Control-Allow-Origin",
//                "Access-Control-Allow-Credentials"
//        ));
//        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
//        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
//        return new CorsFilter(urlBasedCorsConfigurationSource);
//    }

    @Bean
    CommandLineRunner run(AppUserService service) {
        return args -> {
            service.saveRole(new Role(null, "ROLE_ADMIN"));

            service.saveAppUser(new AppUser(null, "admin", "admin", "admin", new ArrayList<>()));

            service.addRoleToAppUser("admin", "ROLE_ADMIN");
        };
    }
}
