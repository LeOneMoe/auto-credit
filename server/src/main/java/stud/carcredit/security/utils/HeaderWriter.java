package stud.carcredit.security.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class HeaderWriter {
    public static void writeUnsuccessfulAuthHeaders(HttpServletResponse response, Exception e) throws IOException {
        Map<String, String> error = new HashMap<>();
        error.put("errorMessage", e.getMessage());

        response.setContentType(APPLICATION_JSON_VALUE);
        response.setStatus(FORBIDDEN.value());
        response.setHeader("error", e.getMessage());

        new ObjectMapper().writeValue(response.getOutputStream(), error);
    }

    public static void writeSuccessfulAuthHeaders(HttpServletResponse response, Date expiresIn, String accessToken, String refreshToken, String username) throws IOException {
        Map<String, String> authRes = new HashMap<>();
        authRes.put("accessToken", accessToken);
        authRes.put("expiresIn", String.valueOf(expiresIn.getTime()));
        authRes.put("refreshToken", refreshToken);
        authRes.put("name", username);

        response.setContentType(APPLICATION_JSON_VALUE);

        new ObjectMapper().writeValue(response.getOutputStream(), authRes);
    }
}
