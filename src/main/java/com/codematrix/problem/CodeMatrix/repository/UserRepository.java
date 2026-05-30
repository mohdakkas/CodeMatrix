package com.codematrix.problem.CodeMatrix.repository;

import com.codematrix.problem.CodeMatrix.entity.AppUser;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<AppUser, Long> {
	Optional<AppUser> findByEmail(String email);

	Optional<AppUser> findByUsername(String username);

	boolean existsByEmail(String email);

	boolean existsByUsername(String username);

	List<AppUser> findAllByOrderBySolvedCountDesc();
}
