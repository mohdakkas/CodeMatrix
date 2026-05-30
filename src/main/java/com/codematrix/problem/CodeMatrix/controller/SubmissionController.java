package com.codematrix.problem.CodeMatrix.controller;

import com.codematrix.problem.CodeMatrix.dto.SubmissionRequest;
import com.codematrix.problem.CodeMatrix.dto.SubmissionResponse;
import com.codematrix.problem.CodeMatrix.service.SubmissionService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SubmissionController {

	private final SubmissionService submissionService;

	public SubmissionController(SubmissionService submissionService) {
		this.submissionService = submissionService;
	}

	@PostMapping("/api/submissions")
	public ResponseEntity<SubmissionResponse> submit(@Valid @RequestBody SubmissionRequest request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(submissionService.submit(request));
	}

	@GetMapping("/api/submissions/my")
	public ResponseEntity<List<SubmissionResponse>> mySubmissions() {
		return ResponseEntity.ok(submissionService.getMySubmissions());
	}

	@GetMapping("/api/submissions/problem/{problemId}")
	public ResponseEntity<List<SubmissionResponse>> problemSubmissions(@PathVariable Long problemId) {
		return ResponseEntity.ok(submissionService.getSubmissionsForProblem(problemId));
	}

	@GetMapping("/api/admin/submissions")
	public ResponseEntity<List<SubmissionResponse>> adminSubmissions() {
		return ResponseEntity.ok(submissionService.getAllSubmissions());
	}
}
