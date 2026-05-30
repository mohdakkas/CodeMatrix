package com.codematrix.problem.CodeMatrix.config;

import com.codematrix.problem.CodeMatrix.entity.AppUser;
import com.codematrix.problem.CodeMatrix.enumtype.Role;
import com.codematrix.problem.CodeMatrix.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public DataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public void run(String... args) {
		if (userRepository.existsByEmail("admin@codeforge.com") || userRepository.existsByUsername("admin")) {
			return;
		}

		AppUser admin = new AppUser();
		admin.setFullName("CodeForge Admin");
		admin.setUsername("admin");
		admin.setEmail("admin@codeforge.com");
		admin.setPassword(passwordEncoder.encode("admin123"));
		admin.setRole(Role.ADMIN);
		admin.setSolvedCount(0);
		userRepository.save(admin);
	}
}
