package com.codematrix.problem.CodeMatrix.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SubmissionRequest(
	@NotNull Long problemId,
	@NotBlank String code,
	@NotBlank String language
) {
}
