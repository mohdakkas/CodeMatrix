package com.codematrix.problem.CodeMatrix.service;

import com.codematrix.problem.CodeMatrix.dto.UserResponse;
import com.codematrix.problem.CodeMatrix.entity.AppUser;

public final class UserMapper {

	private UserMapper() {
	}

	public static UserResponse toResponse(AppUser user) {
		return new UserResponse(
			user.getId(),
			user.getFullName(),
			user.getUsername(),
			user.getEmail(),
			user.getRole(),
			user.getSolvedCount(),
			user.getCreatedAt()
		);
	}
}
