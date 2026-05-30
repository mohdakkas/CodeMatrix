package com.codematrix.problem.CodeMatrix.service;

import com.codematrix.problem.CodeMatrix.dto.UserResponse;
import com.codematrix.problem.CodeMatrix.entity.AppUser;
import com.codematrix.problem.CodeMatrix.exception.ResourceNotFoundException;
import com.codematrix.problem.CodeMatrix.repository.UserRepository;
import com.codematrix.problem.CodeMatrix.security.UserPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	private final UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public UserResponse getMe() {
		return UserMapper.toResponse(getCurrentUser());
	}

	public UserResponse getProfile(Long id) {
		return userRepository.findById(id)
			.map(UserMapper::toResponse)
			.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
	}

	public AppUser getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || !(authentication.getPrincipal() instanceof UserPrincipal principal)) {
			throw new ResourceNotFoundException("Authenticated user not found");
		}
		return userRepository.findById(principal.getId())
			.orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));
	}
}
