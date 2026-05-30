package com.codematrix.problem.CodeMatrix.dto;

import com.codematrix.problem.CodeMatrix.enumtype.Role;
import java.time.LocalDateTime;

public record UserResponse(
	Long id,
	String fullName,
	String username,
	String email,
	Role role,
	Integer solvedCount,
	LocalDateTime createdAt
) {
}
