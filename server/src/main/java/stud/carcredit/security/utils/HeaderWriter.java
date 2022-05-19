package stud.carcredit.security.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class HeaderWriter {
    public static void writeUnsuccessfulAuthResponse(HttpServletResponse response, Exception e) throws IOException {
        Map<String, Object> error = new HashMap<>();
        error.put("errorMessage", e.getMessage());

        response.setContentType(APPLICATION_JSON_VALUE);
        response.setStatus(FORBIDDEN.value());
        response.setHeader("error", e.getMessage());

        new ObjectMapper().writeValue(response.getOutputStream(), error);
    }

    public static void writeSuccessfulAuthResponse(HttpServletResponse response, Date expiresIn, String accessToken, String refreshToken, String username, List<String> roles) throws IOException {
        Map<String, Object> authRes = new HashMap<>();
        authRes.put("accessToken", accessToken);
        authRes.put("expiresIn", String.valueOf(expiresIn.getTime()));
        authRes.put("refreshToken", refreshToken);
        authRes.put("name", username);
        authRes.put("roles", roles);

        response.setContentType(APPLICATION_JSON_VALUE);

        new ObjectMapper().writeValue(response.getOutputStream(), authRes);
    }
}
