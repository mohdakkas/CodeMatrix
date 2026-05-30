package com.codematrix.problem.CodeMatrix.service;

import com.codematrix.problem.CodeMatrix.dto.ProblemRequest;
import com.codematrix.problem.CodeMatrix.dto.ProblemResponse;
import com.codematrix.problem.CodeMatrix.entity.Problem;
import com.codematrix.problem.CodeMatrix.enumtype.Difficulty;
import com.codematrix.problem.CodeMatrix.exception.BadRequestException;
import com.codematrix.problem.CodeMatrix.exception.DuplicateResourceException;
import com.codematrix.problem.CodeMatrix.exception.ResourceNotFoundException;
import com.codematrix.problem.CodeMatrix.repository.ProblemRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProblemService {

	private final ProblemRepository problemRepository;

	public ProblemService(ProblemRepository problemRepository) {
		this.problemRepository = problemRepository;
	}

	public List<ProblemResponse> getAllProblems() {
		return problemRepository.findAll().stream().map(ProblemMapper::toResponse).toList();
	}

	public List<ProblemResponse> getProblems(String difficulty, String tag) {
		List<Problem> problems = difficulty == null || difficulty.isBlank()
			? problemRepository.findAll()
			: problemRepository.findByDifficulty(parseDifficulty(difficulty));

		return problems.stream()
			.filter(problem -> tag == null || tag.isBlank() || problem.getTags().stream().anyMatch(item -> item.equalsIgnoreCase(tag)))
			.map(ProblemMapper::toResponse)
			.toList();
	}

	public ProblemResponse getProblemById(Long id) {
		return ProblemMapper.toResponse(findProblem(id));
	}

	public ProblemResponse getProblemBySlug(String slug) {
		return ProblemMapper.toResponse(problemRepository.findBySlug(slug)
			.orElseThrow(() -> new ResourceNotFoundException("Problem not found with slug: " + slug)));
	}

	@Transactional
	public ProblemResponse createProblem(ProblemRequest request) {
		String slug = resolveSlug(request.title(), request.slug());
		if (problemRepository.existsBySlug(slug)) {
			throw new DuplicateResourceException("Problem slug already exists: " + slug);
		}

		Problem problem = new Problem();
		applyRequest(problem, request, slug);
		return ProblemMapper.toResponse(problemRepository.save(problem));
	}

	@Transactional
	public ProblemResponse updateProblem(Long id, ProblemRequest request) {
		Problem problem = findProblem(id);
		String slug = resolveSlug(request.title(), request.slug());
		if (problemRepository.existsBySlugAndIdNot(slug, id)) {
			throw new DuplicateResourceException("Problem slug already exists: " + slug);
		}
		applyRequest(problem, request, slug);
		return ProblemMapper.toResponse(problemRepository.save(problem));
	}

	@Transactional
	public void deleteProblem(Long id) {
		Problem problem = findProblem(id);
		problemRepository.delete(problem);
	}

	public Problem findProblem(Long id) {
		return problemRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Problem not found with id: " + id));
	}

	private void applyRequest(Problem problem, ProblemRequest request, String slug) {
		problem.setTitle(request.title());
		problem.setSlug(slug);
		problem.setDescription(request.description());
		problem.setDifficulty(request.difficulty());
		problem.setTags(request.tags() == null ? new ArrayList<>() : new ArrayList<>(request.tags()));
		problem.setInputFormat(request.inputFormat());
		problem.setOutputFormat(request.outputFormat());
		problem.setConstraints(request.constraints());
		problem.setSampleInput(request.sampleInput());
		problem.setSampleOutput(request.sampleOutput());
		problem.setExplanation(request.explanation());
		problem.setStarterCode(request.starterCode());
	}

	private String resolveSlug(String title, String requestedSlug) {
		String source = requestedSlug == null || requestedSlug.isBlank() ? title : requestedSlug;
		return source.trim().toLowerCase()
			.replaceAll("[^a-z0-9]+", "-")
			.replaceAll("(^-|-$)", "");
	}

	private Difficulty parseDifficulty(String value) {
		try {
			return Difficulty.valueOf(value.trim().toUpperCase());
		} catch (IllegalArgumentException exception) {
			throw new BadRequestException("Invalid difficulty: " + value);
		}
	}
}
