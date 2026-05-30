package com.codematrix.problem.CodeMatrix.dto;

import com.codematrix.problem.CodeMatrix.enumtype.ContestStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

public record ContestRequest(
	@NotBlank String title,
	@NotBlank String description,
	@NotNull LocalDateTime startTime,
	@NotNull LocalDateTime endTime,
	@NotNull ContestStatus status,
	List<Long> problemIds
) {
}
