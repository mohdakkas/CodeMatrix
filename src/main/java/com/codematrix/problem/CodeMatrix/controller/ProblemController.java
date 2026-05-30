package com.codematrix.problem.CodeMatrix.controller;

import com.codematrix.problem.CodeMatrix.dto.MessageResponse;
import com.codematrix.problem.CodeMatrix.dto.ProblemRequest;
import com.codematrix.problem.CodeMatrix.dto.ProblemResponse;
import com.codematrix.problem.CodeMatrix.service.ProblemService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProblemController {

	private final ProblemService problemService;

	public ProblemController(ProblemService problemService) {
		this.problemService = problemService;
	}

	@GetMapping("/api/problems")
	public ResponseEntity<List<ProblemResponse>> getAllProblems(
		@RequestParam(required = false) String difficulty,
		@RequestParam(required = false) String tag
	) {
		return ResponseEntity.ok(problemService.getProblems(difficulty, tag));
	}

	@GetMapping("/api/problems/{id}")
	public ResponseEntity<ProblemResponse> getProblem(@PathVariable Long id) {
		return ResponseEntity.ok(problemService.getProblemById(id));
	}

	@GetMapping("/api/problems/slug/{slug}")
	public ResponseEntity<ProblemResponse> getProblemBySlug(@PathVariable String slug) {
		return ResponseEntity.ok(problemService.getProblemBySlug(slug));
	}

	@PostMapping("/api/admin/problems")
	public ResponseEntity<ProblemResponse> createProblem(@Valid @RequestBody ProblemRequest request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(problemService.createProblem(request));
	}

	@PutMapping("/api/admin/problems/{id}")
	public ResponseEntity<ProblemResponse> updateProblem(@PathVariable Long id, @Valid @RequestBody ProblemRequest request) {
		return ResponseEntity.ok(problemService.updateProblem(id, request));
	}

	@DeleteMapping("/api/admin/problems/{id}")
	public ResponseEntity<MessageResponse> deleteProblem(@PathVariable Long id) {
		problemService.deleteProblem(id);
		return ResponseEntity.ok(new MessageResponse("Problem deleted successfully"));
	}
}
