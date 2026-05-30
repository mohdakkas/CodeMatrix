package com.codematrix.problem.CodeMatrix.service;

import com.codematrix.problem.CodeMatrix.dto.ContestRequest;
import com.codematrix.problem.CodeMatrix.dto.ContestResponse;
import com.codematrix.problem.CodeMatrix.entity.Contest;
import com.codematrix.problem.CodeMatrix.entity.Problem;
import com.codematrix.problem.CodeMatrix.exception.BadRequestException;
import com.codematrix.problem.CodeMatrix.exception.ResourceNotFoundException;
import com.codematrix.problem.CodeMatrix.repository.ContestRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContestService {

	private final ContestRepository contestRepository;
	private final ProblemService problemService;

	public ContestService(ContestRepository contestRepository, ProblemService problemService) {
		this.contestRepository = contestRepository;
		this.problemService = problemService;
	}

	public List<ContestResponse> getAllContests() {
		return contestRepository.findAll().stream().map(this::toResponse).toList();
	}

	public ContestResponse getContest(Long id) {
		return toResponse(findContest(id));
	}

	@Transactional
	public ContestResponse createContest(ContestRequest request) {
		Contest contest = new Contest();
		applyRequest(contest, request);
		return toResponse(contestRepository.save(contest));
	}

	@Transactional
	public ContestResponse updateContest(Long id, ContestRequest request) {
		Contest contest = findContest(id);
		applyRequest(contest, request);
		return toResponse(contestRepository.save(contest));
	}

	@Transactional
	public void deleteContest(Long id) {
		contestRepository.delete(findContest(id));
	}

	private Contest findContest(Long id) {
		return contestRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Contest not found with id: " + id));
	}

	private void applyRequest(Contest contest, ContestRequest request) {
		if (!request.endTime().isAfter(request.startTime())) {
			throw new BadRequestException("Contest endTime must be after startTime");
		}
		contest.setTitle(request.title());
		contest.setDescription(request.description());
		contest.setStartTime(request.startTime());
		contest.setEndTime(request.endTime());
		contest.setStatus(request.status());
		contest.setProblems(resolveProblems(request.problemIds()));
	}

	private List<Problem> resolveProblems(List<Long> problemIds) {
		if (problemIds == null || problemIds.isEmpty()) {
			return new ArrayList<>();
		}
		return problemIds.stream().map(problemService::findProblem).toList();
	}

	private ContestResponse toResponse(Contest contest) {
		return new ContestResponse(
			contest.getId(),
			contest.getTitle(),
			contest.getDescription(),
			contest.getStartTime(),
			contest.getEndTime(),
			contest.getStatus(),
			contest.getProblems().stream().map(ProblemMapper::toResponse).toList()
		);
	}
}
