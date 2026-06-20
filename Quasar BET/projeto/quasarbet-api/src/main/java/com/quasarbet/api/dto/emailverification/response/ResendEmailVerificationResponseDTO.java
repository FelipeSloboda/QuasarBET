package com.quasarbet.api.dto.emailverification.response;

import java.time.LocalDateTime;

public class ResendEmailVerificationResponseDTO {

    private String email;
    private LocalDateTime expiresAt;

    public ResendEmailVerificationResponseDTO(String email, LocalDateTime expiresAt) {
        this.email = email;
        this.expiresAt = expiresAt;
    }

    public String getEmail() {
        return email;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }
}