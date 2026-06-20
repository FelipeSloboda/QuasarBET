package com.quasarbet.api.service;

import com.quasarbet.api.entity.TokenType;
import com.quasarbet.api.entity.User;
import com.quasarbet.api.entity.UserToken;
import com.quasarbet.api.repository.UserTokenRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
public class UserTokenService {

    private final UserTokenRepository userTokenRepository;
    private final EmailService emailService;
    private final SecureRandom secureRandom = new SecureRandom();

    @Value("${app.frontend.base-url}")
    private String frontendBaseUrl;

    @Value("${api.token.email-confirmation.minutes}")
    private int emailConfirmExpirationMinutes;

    @Value("${api.token.verify-email-session.minutes}")
    private int verifyEmailSessionExpirationMinutes;

    public UserTokenService(UserTokenRepository userTokenRepository, EmailService emailService) {
        this.userTokenRepository = userTokenRepository;
        this.emailService = emailService;
    }

    public void issueEmailConfirmation(User user) {
        String token = generateSecureToken();

        UserToken userToken = new UserToken();
        userToken.setUser(user);
        userToken.setToken(token);
        userToken.setTokenType(TokenType.EMAIL_CONFIRMATION);
        userToken.setExpiresAt(LocalDateTime.now().plusMinutes(emailConfirmExpirationMinutes));
        userTokenRepository.save(userToken);

        String confirmationUrl = frontendBaseUrl + "/confirm-email?token=" + token;
        emailService.sendConfirmEmail(user.getEmail(), user.getFirstName(), confirmationUrl, emailConfirmExpirationMinutes);
    }

    public String issueVerifyEmailSession(User user) {
        String token = generateSecureToken();

        UserToken userToken = new UserToken();
        userToken.setUser(user);
        userToken.setToken(token);
        userToken.setTokenType(TokenType.VERIFY_EMAIL_SESSION);
        userToken.setExpiresAt(LocalDateTime.now().plusMinutes(verifyEmailSessionExpirationMinutes));
        userTokenRepository.save(userToken);

        return token;
    }

    private String generateSecureToken() {
        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);
        StringBuilder sb = new StringBuilder(64);
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}