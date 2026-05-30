package com.codematrix.problem.CodeMatrix.service;

import com.codematrix.problem.CodeMatrix.dto.LeaderboardEntryResponse;
import com.codematrix.problem.CodeMatrix.entity.AppUser;
import com.codematrix.problem.CodeMatrix.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class LeaderboardService {

	private final UserRepository userRepository;

	public LeaderboardService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public List<LeaderboardEntryResponse> getLeaderboard() {
		List<AppUser> users = userRepository.findAllByOrderBySolvedCountDesc();
		List<LeaderboardEntryResponse> response = new ArrayList<>();
		for (int index = 0; index < users.size(); index++) {
			AppUser user = users.get(index);
			response.add(new LeaderboardEntryResponse(
				index + 1,
				user.getId(),
				user.getFullName(),
				user.getUsername(),
				user.getSolvedCount()
			));
		}
		return response;
	}
}
