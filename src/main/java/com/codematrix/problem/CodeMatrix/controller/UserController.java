package com.codematrix.problem.CodeMatrix.controller;

import com.codematrix.problem.CodeMatrix.dto.UserResponse;
import com.codematrix.problem.CodeMatrix.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/me")
	public ResponseEntity<UserResponse> me() {
		return ResponseEntity.ok(userService.getMe());
	}

	@GetMapping("/profile/{id}")
	public ResponseEntity<UserResponse> profile(@PathVariable Long id) {
		return ResponseEntity.ok(userService.getProfile(id));
	}
}
