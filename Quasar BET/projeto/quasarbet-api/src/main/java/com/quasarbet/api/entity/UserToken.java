package com.quasarbet.api.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_tokens")
public class UserToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, unique = true, length = 64)
    private String token;

    @Enumerated(EnumType.STRING)
    @Column(name = "token_type", length = 30, nullable = false)
    private TokenType tokenType;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;

    @Column(name = "used_at")
    private LocalDateTime usedAt;

    public UserToken() {}

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { 
        return id; 
    }

    public User getUser() { 
        return user; 
    }

    public void setUser(User user) { 
        this.user = user; 
    }

    public String getToken() { 
        return token; 
    }

    public void setToken(String token) { 
        this.token = token; 
    }

    public TokenType getTokenType() { 
        return tokenType; 
    }

    public void setTokenType(TokenType tokenType) { 
        this.tokenType = tokenType; 
    }

    public LocalDateTime getCreatedAt() { 
        return createdAt; 
    }

    public LocalDateTime getExpiresAt() { 
        return expiresAt; 
    }
    public void setExpiresAt(LocalDateTime expiresAt) { 
        this.expiresAt = expiresAt; 
    }

    public LocalDateTime getUsedAt() {
        return usedAt;
    }

    public void setUsedAt(LocalDateTime usedAt) {
        this.usedAt = usedAt;
    }

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(this.expiresAt);
    }

    public boolean isUsed() {
        return this.usedAt != null;
    }
}