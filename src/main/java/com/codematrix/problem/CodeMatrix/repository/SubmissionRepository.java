package com.codematrix.problem.CodeMatrix.repository;

import com.codematrix.problem.CodeMatrix.entity.AppUser;
import com.codematrix.problem.CodeMatrix.entity.Problem;
import com.codematrix.problem.CodeMatrix.entity.Submission;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
	List<Submission> findByUserOrderBySubmittedAtDesc(AppUser user);

	List<Submission> findByProblemOrderBySubmittedAtDesc(Problem problem);
}
