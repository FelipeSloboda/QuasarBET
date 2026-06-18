package com.quasarbet.api.exception;

import com.quasarbet.api.dto.common.ApiErrorItem;
import com.quasarbet.api.dto.common.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationException(MethodArgumentNotValidException e) {
        List<ApiErrorItem> errors = e.getBindingResult().getFieldErrors().stream()
                .map(this::toValidationError)
                .toList();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error("Dados inválidos", errors));
    }

    @ExceptionHandler(ResourceConflictException.class)
    public ResponseEntity<ApiResponse<Void>> handleResourceConflictException(ResourceConflictException e) {
        ApiErrorItem error = new ApiErrorItem(e.getField(), e.getCode(), e.getMessage());

        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ApiResponse.error(e.getMessage(), List.of(error)));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleResourceNotFoundException(ResourceNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error(e.getMessage(), Collections.emptyList()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Void>> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error(e.getMessage(), Collections.emptyList()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneralException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Erro interno. Tente novamente mais tarde.", Collections.emptyList()));
    }

    private ApiErrorItem toValidationError(FieldError error) {
        return new ApiErrorItem(error.getField(), mapValidationCode(error), error.getDefaultMessage());
    }

    private String mapValidationCode(FieldError error) {
        String code = error.getCode();

        if (code == null) {
            return "INVALID_VALUE";
        }

        return switch (code) {
            case "NotBlank", "NotNull" -> "REQUIRED";
            case "Email", "Pattern" -> "INVALID_FORMAT";
            case "Past" -> "INVALID_DATE";
            case "Size" -> mapSizeCode(error);
            default -> "INVALID_VALUE";
        };
    }

    private String mapSizeCode(FieldError error) {
        Object rejectedValue = error.getRejectedValue();
        if (rejectedValue instanceof String value) {
            if (value.isBlank()) {
                return "REQUIRED";
            }

            Long min = null;
            Long max = null;

            List<Long> numericArgs = new ArrayList<>();
            for (Object argument : error.getArguments()) {
                if (argument instanceof Number number) {
                    numericArgs.add(number.longValue());
                }
            }

            if (numericArgs.size() >= 2) {
                min = Math.min(numericArgs.get(0), numericArgs.get(1));
                max = Math.max(numericArgs.get(0), numericArgs.get(1));
            } else if (numericArgs.size() == 1) {
                max = numericArgs.get(0);
            }

            if (min != null && value.length() < min) {
                return "TOO_SHORT";
            }

            if (max != null && value.length() > max) {
                return "TOO_LONG";
            }

            return "INVALID_LENGTH";
        }

        return "INVALID_LENGTH";
    }
}
