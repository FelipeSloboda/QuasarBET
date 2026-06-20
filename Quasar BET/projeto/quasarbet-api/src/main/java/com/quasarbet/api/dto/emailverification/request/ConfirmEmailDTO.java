package com.quasarbet.api.dto.emailverification.request;

import jakarta.validation.constraints.NotBlank;

public class ConfirmEmailDTO {

    @NotBlank(message = "O token de confirmação é obrigatório")
    private String token;

    public ConfirmEmailDTO() {}

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}