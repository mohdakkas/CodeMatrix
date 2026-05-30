package com.codematrix.problem.CodeMatrix.controller;

import com.codematrix.problem.CodeMatrix.dto.LeaderboardEntryResponse;
import com.codematrix.problem.CodeMatrix.service.LeaderboardService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LeaderboardController {

	private final LeaderboardService leaderboardService;

	public LeaderboardController(LeaderboardService leaderboardService) {
		this.leaderboardService = leaderboardService;
	}

	@GetMapping("/api/leaderboard")
	public ResponseEntity<List<LeaderboardEntryResponse>> leaderboard() {
		return ResponseEntity.ok(leaderboardService.getLeaderboard());
	}
}
