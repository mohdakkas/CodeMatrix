package com.codematrix.problem.CodeMatrix.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
	@NotBlank String fullName,
	@NotBlank @Size(min = 3, max = 30) String username,
	@NotBlank @Email String email,
	@NotBlank @Size(min = 6, max = 100) String password
) {
}
