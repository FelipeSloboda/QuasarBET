package com.quasarbet.api.service;

import com.quasarbet.api.entity.TokenType;
import com.quasarbet.api.entity.User;
import com.quasarbet.api.entity.UserStatus;
import com.quasarbet.api.entity.UserToken;
import com.quasarbet.api.exception.ResourceConflictException;
import com.quasarbet.api.exception.ResourceNotFoundException;
import com.quasarbet.api.exception.TokenExpiredException;
import com.quasarbet.api.repository.UserRepository;
import com.quasarbet.api.repository.UserTokenRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserTokenService {

    private final UserTokenRepository userTokenRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final SecureRandom secureRandom = new SecureRandom();

    @Value("${app.frontend.base-url}")
    private String frontendBaseUrl;

    @Value("${api.token.email-confirmation.minutes}")
    private int emailConfirmExpirationMinutes;

    @Value("${api.token.verify-email-session.minutes}")
    private int verifyEmailSessionExpirationMinutes;

    public UserTokenService(UserTokenRepository userTokenRepository,
                            UserRepository userRepository,
                            EmailService emailService) {
        this.userTokenRepository = userTokenRepository;
        this.userRepository = userRepository;
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

    @Transactional
    public void resendEmailVerification(String sessionToken) {
        UserToken session = userTokenRepository
                .findByTokenAndTokenTypeAndUsedAtIsNull(sessionToken, TokenType.VERIFY_EMAIL_SESSION)
                .orElseThrow(() -> new ResourceNotFoundException("Token de sessão inválido"));

        if (session.isExpired()) {
            throw new TokenExpiredException("Sessão expirada.");
        }

        User user = session.getUser();

        if (Boolean.TRUE.equals(user.getEmailVerified())) {
            throw new ResourceConflictException("emailVerified", "ALREADY_VERIFIED", "E-mail já foi verificado");
        }

        UserToken emailConfirmation = userTokenRepository
                .findByUserAndTokenTypeAndUsedAtIsNull(user, TokenType.EMAIL_CONFIRMATION)
                .stream()
                .filter(t -> !t.isExpired())
                .findFirst()
                .orElseThrow(() -> new TokenExpiredException("Token de confirmação expirado."));

        String confirmationUrl = frontendBaseUrl + "/confirm-email?token=" + emailConfirmation.getToken();
        emailService.sendConfirmEmail(user.getEmail(), user.getFirstName(), confirmationUrl, emailConfirmExpirationMinutes);

    }

    @Transactional
    public void confirmEmail(String token) {
        UserToken userToken = userTokenRepository
                .findByTokenAndTokenTypeAndUsedAtIsNull(token, TokenType.EMAIL_CONFIRMATION)
                .orElseThrow(() -> new ResourceNotFoundException("Token de confirmação inválido"));

        if (userToken.isExpired()) {
            throw new TokenExpiredException("Token de confirmação expirado. Solicite o reenvio do e-mail.");
        }

        User user = userToken.getUser();

        if (Boolean.TRUE.equals(user.getEmailVerified())) {
            return;
        }

        user.setEmailVerified(true);
        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);

        markAsUsed(userToken);
        revokeActiveTokens(user, TokenType.VERIFY_EMAIL_SESSION);
    }

    private void revokeActiveTokens(User user, TokenType tokenType) {
        List<UserToken> activeTokens = userTokenRepository
                .findByUserAndTokenTypeAndUsedAtIsNull(user, tokenType);

        LocalDateTime now = LocalDateTime.now();
        activeTokens.forEach(t -> t.setUsedAt(now));
        userTokenRepository.saveAll(activeTokens);
    }

    private void markAsUsed(UserToken userToken) {
        userToken.setUsedAt(LocalDateTime.now());
        userTokenRepository.save(userToken);
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