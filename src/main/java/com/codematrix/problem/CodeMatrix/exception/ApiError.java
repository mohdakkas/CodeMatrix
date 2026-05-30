package com.codematrix.problem.CodeMatrix.exception;

import java.time.LocalDateTime;
import java.util.Map;

public record ApiError(
	LocalDateTime timestamp,
	Integer status,
	String error,
	String message,
	String path,
	Map<String, String> validationErrors
) {
}
