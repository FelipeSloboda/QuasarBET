package com.quasarbet.api.dto.common;

import java.util.Collections;
import java.util.List;

public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private List<ApiErrorItem> errors;
    private Object meta;

    public ApiResponse() {}

    public ApiResponse(boolean success, String message, T data, List<ApiErrorItem> errors, Object meta) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.errors = errors;
        this.meta = meta;
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data, Collections.emptyList(), null);
    }

    public static <T> ApiResponse<T> error(String message, List<ApiErrorItem> errors) {
        return new ApiResponse<>(false, message, null, errors, null);
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public List<ApiErrorItem> getErrors() {
        return errors;
    }

    public void setErrors(List<ApiErrorItem> errors) {
        this.errors = errors;
    }

    public Object getMeta() {
        return meta;
    }

    public void setMeta(Object meta) {
        this.meta = meta;
    }
}