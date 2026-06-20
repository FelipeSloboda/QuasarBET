package com.quasarbet.api.controller;

import jakarta.validation.Valid;
import com.quasarbet.api.dto.common.ApiResponse;
import com.quasarbet.api.dto.emailverification.request.ConfirmEmailDTO;
import com.quasarbet.api.dto.emailverification.request.ResendEmailVerificationDTO;
import com.quasarbet.api.service.UserTokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email-verification")
@Tag(name = "Email Verification", description = "Email verification management API")
public class EmailVerificationController {

    private final UserTokenService userTokenService;

    public EmailVerificationController(UserTokenService userTokenService) {
        this.userTokenService = userTokenService;
    }

    @PostMapping("/resend")
    @Operation(summary = "Resend email verification")
    public ResponseEntity<ApiResponse<Void>> resend(@Valid @RequestBody ResendEmailVerificationDTO dto) {
        userTokenService.resendEmailVerification(dto.getSessionToken());
        return ResponseEntity.ok(ApiResponse.success("E-mail de confirmação reenviado com sucesso", null));
    }

    @PostMapping("/confirm")
    @Operation(summary = "Confirm email")
    public ResponseEntity<ApiResponse<Void>> confirm(@Valid @RequestBody ConfirmEmailDTO dto) {
        userTokenService.confirmEmail(dto.getToken());
        return ResponseEntity.ok(ApiResponse.success("E-mail confirmado com sucesso", null));
    }
}