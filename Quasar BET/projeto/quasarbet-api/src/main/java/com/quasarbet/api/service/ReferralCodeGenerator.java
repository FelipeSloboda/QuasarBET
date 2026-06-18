package com.quasarbet.api.service;

import com.quasarbet.api.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class ReferralCodeGenerator {

    // exclui I, O, 0, 1 para evitar confusão visual
    private static final String CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    private static final int CODE_LENGTH = 8;

    private final SecureRandom random = new SecureRandom();
    private final UserRepository userRepository;

    public ReferralCodeGenerator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String generate() {
        String code;
        do {
            code = randomCode();
        } while (userRepository.existsByReferralCode(code));
        return code;
    }

    private String randomCode() {
        StringBuilder sb = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            sb.append(CHARS.charAt(random.nextInt(CHARS.length())));
        }
        return sb.toString();
    }
}