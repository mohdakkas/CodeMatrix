package com.codematrix.problem.CodeMatrix.dto;

import com.codematrix.problem.CodeMatrix.enumtype.SubmissionStatus;
import java.time.LocalDateTime;

public record SubmissionResponse(
	Long id,
	Long userId,
	String username,
	Long problemId,
	String problemTitle,
	String language,
	SubmissionStatus status,
	Long runtime,
	Long memory,
	LocalDateTime submittedAt
) {
}
