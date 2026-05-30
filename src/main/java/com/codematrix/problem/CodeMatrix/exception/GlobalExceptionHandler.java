package com.codematrix.problem.CodeMatrix.exception;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiError> handleNotFound(ResourceNotFoundException exception, HttpServletRequest request) {
		return build(HttpStatus.NOT_FOUND, exception.getMessage(), request, null);
	}

	@ExceptionHandler(DuplicateResourceException.class)
	public ResponseEntity<ApiError> handleDuplicate(DuplicateResourceException exception, HttpServletRequest request) {
		return build(HttpStatus.CONFLICT, exception.getMessage(), request, null);
	}

	@ExceptionHandler({ BadRequestException.class, InvalidCredentialsException.class })
	public ResponseEntity<ApiError> handleBadRequest(RuntimeException exception, HttpServletRequest request) {
		return build(HttpStatus.BAD_REQUEST, exception.getMessage(), request, null);
	}

	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<ApiError> handleAccessDenied(AccessDeniedException exception, HttpServletRequest request) {
		return build(HttpStatus.FORBIDDEN, "You do not have permission to access this resource", request, null);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException exception, HttpServletRequest request) {
		Map<String, String> errors = new HashMap<>();
		exception.getBindingResult().getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
		return build(HttpStatus.BAD_REQUEST, "Validation failed", request, errors);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiError> handleUnknown(Exception exception, HttpServletRequest request) {
		return build(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong", request, null);
	}

	private ResponseEntity<ApiError> build(HttpStatus status, String message, HttpServletRequest request, Map<String, String> validationErrors) {
		ApiError error = new ApiError(
			LocalDateTime.now(),
			status.value(),
			status.getReasonPhrase(),
			message,
			request.getRequestURI(),
			validationErrors
		);
		return ResponseEntity.status(status).body(error);
	}
}
