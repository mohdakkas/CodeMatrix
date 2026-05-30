package com.codematrix.problem.CodeMatrix.dto;

public record AuthResponse(
	String token,
	String tokenType,
	UserResponse user
) {
}
