package com.codematrix.problem.CodeMatrix.dto;

public record LeaderboardEntryResponse(
	Integer rank,
	Long userId,
	String fullName,
	String username,
	Integer solvedCount
) {
}
