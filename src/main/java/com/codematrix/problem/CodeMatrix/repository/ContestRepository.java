package com.codematrix.problem.CodeMatrix.repository;

import com.codematrix.problem.CodeMatrix.entity.Contest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContestRepository extends JpaRepository<Contest, Long> {
}
