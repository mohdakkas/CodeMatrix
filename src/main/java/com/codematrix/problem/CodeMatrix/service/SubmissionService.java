package com.codematrix.problem.CodeMatrix.service;

import com.codematrix.problem.CodeMatrix.dto.SubmissionRequest;
import com.codematrix.problem.CodeMatrix.dto.SubmissionResponse;
import com.codematrix.problem.CodeMatrix.entity.AppUser;
import com.codematrix.problem.CodeMatrix.entity.Problem;
import com.codematrix.problem.CodeMatrix.entity.Submission;
import com.codematrix.problem.CodeMatrix.enumtype.SubmissionStatus;
import com.codematrix.problem.CodeMatrix.repository.SubmissionRepository;
import com.codematrix.problem.CodeMatrix.repository.UserRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SubmissionService {

	private final SubmissionRepository submissionRepository;
	private final ProblemService problemService;
	private final UserService userService;
	private final UserRepository userRepository;

	public SubmissionService(
		SubmissionRepository submissionRepository,
		ProblemService problemService,
		UserService userService,
		UserRepository userRepository
	) {
		this.submissionRepository = submissionRepository;
		this.problemService = problemService;
		this.userService = userService;
		this.userRepository = userRepository;
	}

	@Transactional
	public SubmissionResponse submit(SubmissionRequest request) {
		AppUser user = userService.getCurrentUser();
		Problem problem = problemService.findProblem(request.problemId());
		SubmissionStatus status = request.code().contains("return") ? SubmissionStatus.ACCEPTED : SubmissionStatus.WRONG_ANSWER;

		Submission submission = new Submission();
		submission.setUser(user);
		submission.setProblem(problem);
		submission.setCode(request.code());
		submission.setLanguage(request.language());
		submission.setStatus(status);
		submission.setRuntime(status == SubmissionStatus.ACCEPTED ? 42L : 0L);
		submission.setMemory(status == SubmissionStatus.ACCEPTED ? 40960L : 0L);

		if (status == SubmissionStatus.ACCEPTED) {
			user.setSolvedCount(user.getSolvedCount() + 1);
			userRepository.save(user);
		}

		return toResponse(submissionRepository.save(submission));
	}

	public List<SubmissionResponse> getMySubmissions() {
		AppUser user = userService.getCurrentUser();
		return submissionRepository.findByUserOrderBySubmittedAtDesc(user).stream().map(this::toResponse).toList();
	}

	public List<SubmissionResponse> getSubmissionsForProblem(Long problemId) {
		Problem problem = problemService.findProblem(problemId);
		return submissionRepository.findByProblemOrderBySubmittedAtDesc(problem).stream().map(this::toResponse).toList();
	}

	public List<SubmissionResponse> getAllSubmissions() {
		return submissionRepository.findAll().stream().map(this::toResponse).toList();
	}

	private SubmissionResponse toResponse(Submission submission) {
		return new SubmissionResponse(
			submission.getId(),
			submission.getUser().getId(),
			submission.getUser().getUsername(),
			submission.getProblem().getId(),
			submission.getProblem().getTitle(),
			submission.getLanguage(),
			submission.getStatus(),
			submission.getRuntime(),
			submission.getMemory(),
			submission.getSubmittedAt()
		);
	}
}
