package com.quasarbet.api.dto.emailverification.response;

public class ConfirmEmailResponseDTO {

    private String email;
    private String status;

    public ConfirmEmailResponseDTO(String email, String status) {
        this.email = email;
        this.status = status;
    }

    public String getEmail() {
        return email;
    }

    public String getStatus() {
        return status;
    }
}