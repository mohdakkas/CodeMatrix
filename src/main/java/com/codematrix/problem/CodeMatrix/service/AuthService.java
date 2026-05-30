package com.codematrix.problem.CodeMatrix.service;

import com.codematrix.problem.CodeMatrix.dto.AuthResponse;
import com.codematrix.problem.CodeMatrix.dto.LoginRequest;
import com.codematrix.problem.CodeMatrix.dto.RegisterRequest;
import com.codematrix.problem.CodeMatrix.entity.AppUser;
import com.codematrix.problem.CodeMatrix.enumtype.Role;
import com.codematrix.problem.CodeMatrix.exception.DuplicateResourceException;
import com.codematrix.problem.CodeMatrix.exception.InvalidCredentialsException;
import com.codematrix.problem.CodeMatrix.repository.UserRepository;
import com.codematrix.problem.CodeMatrix.security.JwtService;
import com.codematrix.problem.CodeMatrix.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtService jwtService;

	public AuthService(
		UserRepository userRepository,
		PasswordEncoder passwordEncoder,
		AuthenticationManager authenticationManager,
		JwtService jwtService
	) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
		this.jwtService = jwtService;
	}

	@Transactional
	public AuthResponse register(RegisterRequest request) {
		if (userRepository.existsByEmail(request.email())) {
			throw new DuplicateResourceException("Email is already registered");
		}
		if (userRepository.existsByUsername(request.username())) {
			throw new DuplicateResourceException("Username is already taken");
		}

		AppUser user = new AppUser();
		user.setFullName(request.fullName());
		user.setUsername(request.username());
		user.setEmail(request.email());
		user.setPassword(passwordEncoder.encode(request.password()));
		user.setRole(Role.USER);
		user.setSolvedCount(0);
		AppUser savedUser = userRepository.save(user);
		String token = jwtService.generateToken(new UserPrincipal(savedUser));
		return new AuthResponse(token, "Bearer", UserMapper.toResponse(savedUser));
	}

	public AuthResponse login(LoginRequest request) {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
		} catch (BadCredentialsException exception) {
			throw new InvalidCredentialsException("Invalid email or password");
		}

		AppUser user = userRepository.findByEmail(request.email())
			.orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));
		String token = jwtService.generateToken(new UserPrincipal(user));
		return new AuthResponse(token, "Bearer", UserMapper.toResponse(user));
	}
}
