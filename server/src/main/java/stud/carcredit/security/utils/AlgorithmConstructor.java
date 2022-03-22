package stud.carcredit.security.utils;

import com.auth0.jwt.algorithms.Algorithm;

public class AlgorithmConstructor {
    private static final String SECRET = "secret";

    public static Algorithm getAlgorithm() {
        return Algorithm.HMAC256(SECRET.getBytes());
    }
}
