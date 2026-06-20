package com.quasarbet.api.dto.emailverification.request;

import jakarta.validation.constraints.NotBlank;

public class ResendEmailVerificationDTO {

    @NotBlank(message = "O token de sessão é obrigatório")
    private String sessionToken;

    public ResendEmailVerificationDTO() {}

    public String getSessionToken() {
        return sessionToken;
    }

    public void setSessionToken(String sessionToken) {
        this.sessionToken = sessionToken;
    }
}