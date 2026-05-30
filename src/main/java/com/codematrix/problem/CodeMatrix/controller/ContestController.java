package com.codematrix.problem.CodeMatrix.controller;

import com.codematrix.problem.CodeMatrix.dto.ContestRequest;
import com.codematrix.problem.CodeMatrix.dto.ContestResponse;
import com.codematrix.problem.CodeMatrix.dto.MessageResponse;
import com.codematrix.problem.CodeMatrix.service.ContestService;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContestController {

	private final ContestService contestService;

	public ContestController(ContestService contestService) {
		this.contestService = contestService;
	}

	@GetMapping("/api/contests")
	public ResponseEntity<List<ContestResponse>> getAllContests() {
		return ResponseEntity.ok(contestService.getAllContests());
	}

	@GetMapping("/api/contests/{id}")
	public ResponseEntity<ContestResponse> getContest(@PathVariable Long id) {
		return ResponseEntity.ok(contestService.getContest(id));
	}

	@PostMapping("/api/admin/contests")
	public ResponseEntity<ContestResponse> createContest(@Valid @RequestBody ContestRequest request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(contestService.createContest(request));
	}

	@PutMapping("/api/admin/contests/{id}")
	public ResponseEntity<ContestResponse> updateContest(@PathVariable Long id, @Valid @RequestBody ContestRequest request) {
		return ResponseEntity.ok(contestService.updateContest(id, request));
	}

	@DeleteMapping("/api/admin/contests/{id}")
	public ResponseEntity<MessageResponse> deleteContest(@PathVariable Long id) {
		contestService.deleteContest(id);
		return ResponseEntity.ok(new MessageResponse("Contest deleted successfully"));
	}
}
