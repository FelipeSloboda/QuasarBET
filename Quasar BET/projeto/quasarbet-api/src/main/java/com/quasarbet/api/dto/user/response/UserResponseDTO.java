package com.quasarbet.api.dto.user.response;

import java.time.LocalDateTime;

public class UserResponseDTO {
    private Long id;
    private String referralCode;
    private String firstName;
    private LocalDateTime createdAt;

    public UserResponseDTO() {}

    public UserResponseDTO(Long id, String referralCode, String firstName, LocalDateTime createdAt) {
        this.id = id;
        this.referralCode = referralCode;
        this.firstName = firstName;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReferralCode() {
        return referralCode;
    }

    public void setReferralCode(String referralCode) {
        this.referralCode = referralCode;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}