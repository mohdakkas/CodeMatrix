package com.codematrix.problem.CodeMatrix.repository;

import com.codematrix.problem.CodeMatrix.entity.Problem;
import com.codematrix.problem.CodeMatrix.enumtype.Difficulty;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepository extends JpaRepository<Problem, Long> {
	Optional<Problem> findBySlug(String slug);

	List<Problem> findByDifficulty(Difficulty difficulty);

	boolean existsBySlug(String slug);

	boolean existsBySlugAndIdNot(String slug, Long id);
}
