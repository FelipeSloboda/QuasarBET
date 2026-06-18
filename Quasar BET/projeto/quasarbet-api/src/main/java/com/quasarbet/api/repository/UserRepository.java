package com.quasarbet.api.repository;

import com.quasarbet.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByCpf(String cpf);
    boolean existsByEmail(String email);
    boolean existsByReferralCode(String referralCode);
    Optional<User> findByEmail(String email);
}
