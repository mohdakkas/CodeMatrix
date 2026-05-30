package com.codematrix.problem.CodeMatrix.dto;

import com.codematrix.problem.CodeMatrix.enumtype.Difficulty;
import java.time.LocalDateTime;
import java.util.List;

public record ProblemResponse(
	Long id,
	String title,
	String slug,
	String description,
	Difficulty difficulty,
	List<String> tags,
	String inputFormat,
	String outputFormat,
	String constraints,
	String sampleInput,
	String sampleOutput,
	String explanation,
	String starterCode,
	LocalDateTime createdAt
) {
}
