package com.codematrix.problem.CodeMatrix.dto;

import com.codematrix.problem.CodeMatrix.enumtype.Difficulty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

public record ProblemRequest(
	@NotBlank String title,
	String slug,
	@NotBlank String description,
	@NotNull Difficulty difficulty,
	@Size(min = 1, message = "At least one tag is required") List<@NotBlank String> tags,
	String inputFormat,
	String outputFormat,
	String constraints,
	String sampleInput,
	String sampleOutput,
	String explanation,
	String starterCode
) {
}
