package com.codematrix.problem.CodeMatrix.service;

import com.codematrix.problem.CodeMatrix.dto.ProblemResponse;
import com.codematrix.problem.CodeMatrix.entity.Problem;

public final class ProblemMapper {

	private ProblemMapper() {
	}

	public static ProblemResponse toResponse(Problem problem) {
		return new ProblemResponse(
			problem.getId(),
			problem.getTitle(),
			problem.getSlug(),
			problem.getDescription(),
			problem.getDifficulty(),
			problem.getTags(),
			problem.getInputFormat(),
			problem.getOutputFormat(),
			problem.getConstraints(),
			problem.getSampleInput(),
			problem.getSampleOutput(),
			problem.getExplanation(),
			problem.getStarterCode(),
			problem.getCreatedAt()
		);
	}
}
