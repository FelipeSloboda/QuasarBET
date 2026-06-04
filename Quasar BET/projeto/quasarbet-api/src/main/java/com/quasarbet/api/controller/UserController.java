package com.quasarbet.api.controller;

import jakarta.validation.Valid;
import com.quasarbet.api.dto.user.request.CreateUserDTO;
import com.quasarbet.api.dto.user.response.UserResponseDTO;
import com.quasarbet.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import java.util.List;

@RestController
@RequestMapping("/users")
@Tag(name = "Users", description = "User management API")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    @Operation(summary = "Create new user")
    public ResponseEntity<UserResponseDTO> create(@Valid @RequestBody CreateUserDTO createUserDTO) {
        UserResponseDTO createdUser = userService.create(createUserDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
    /*
    @GetMapping
    @Operation(summary = "List all users")
    public ResponseEntity<List<CreateUserDTO>> getAll() {
        List<CreateUserDTO> users = userService.getAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID")
    public ResponseEntity<CreateUserDTO> getById(@PathVariable Long id) {
        try {
            CreateUserDTO user = userService.getById(id);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/email/{email}")
    @Operation(summary = "Get user by email")
    public ResponseEntity<CreateUserDTO> getByEmail(@PathVariable String email) {
        try {
            CreateUserDTO user = userService.getByEmail(email);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update user")
    public ResponseEntity<CreateUserDTO> update(@PathVariable Long id, @RequestBody CreateUserDTO userDTO) {
        try {
            CreateUserDTO updatedUser = userService.update(id, userDTO);
            return ResponseEntity.ok(updatedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete user")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            userService.delete(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }*/
}
