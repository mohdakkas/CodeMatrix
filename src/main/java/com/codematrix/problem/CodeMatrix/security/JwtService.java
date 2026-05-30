package com.codematrix.problem.CodeMatrix.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

	private final SecretKey secretKey;
	private final long expirationMs;

	public JwtService(
		@Value("${app.jwt.secret}") String secret,
		@Value("${app.jwt.expiration-ms}") long expirationMs
	) {
		this.secretKey = Keys.hmacShaKeyFor(sha256(secret));
		this.expirationMs = expirationMs;
	}

	public String generateToken(UserPrincipal principal) {
		Date now = new Date();
		return Jwts.builder()
			.subject(principal.getUsername())
			.claim("userId", principal.getId())
			.claim("role", principal.getUser().getRole().name())
			.issuedAt(now)
			.expiration(new Date(now.getTime() + expirationMs))
			.signWith(secretKey)
			.compact();
	}

	public String extractEmail(String token) {
		return claims(token).getSubject();
	}

	public boolean isTokenValid(String token, UserDetails userDetails) {
		String email = extractEmail(token);
		return email.equals(userDetails.getUsername()) && claims(token).getExpiration().after(new Date());
	}

	private Claims claims(String token) {
		return Jwts.parser()
			.verifyWith(secretKey)
			.build()
			.parseSignedClaims(token)
			.getPayload();
	}

	private byte[] sha256(String input) {
		try {
			return MessageDigest.getInstance("SHA-256").digest(input.getBytes(StandardCharsets.UTF_8));
		} catch (NoSuchAlgorithmException exception) {
			throw new IllegalStateException("SHA-256 is not available", exception);
		}
	}
}
