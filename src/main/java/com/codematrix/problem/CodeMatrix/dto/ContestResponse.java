package com.codematrix.problem.CodeMatrix.dto;

import com.codematrix.problem.CodeMatrix.enumtype.ContestStatus;
import java.time.LocalDateTime;
import java.util.List;

public record ContestResponse(
	Long id,
	String title,
	String description,
	LocalDateTime startTime,
	LocalDateTime endTime,
	ContestStatus status,
	List<ProblemResponse> problems
) {
}
