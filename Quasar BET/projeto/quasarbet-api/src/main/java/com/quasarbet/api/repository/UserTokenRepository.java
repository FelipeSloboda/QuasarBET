package com.quasarbet.api.repository;

import com.quasarbet.api.entity.TokenType;
import com.quasarbet.api.entity.User;
import com.quasarbet.api.entity.UserToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserTokenRepository extends JpaRepository<UserToken, Long> {
    Optional<UserToken> findByToken(String token);
    Optional<UserToken> findByTokenAndTokenTypeAndUsedAtIsNull(String token, TokenType tokenType);
    List<UserToken> findByUserAndTokenTypeAndUsedAtIsNull(User user, TokenType tokenType);
}