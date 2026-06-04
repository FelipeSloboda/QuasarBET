package com.quasarbet.api.service;

import com.quasarbet.api.dto.user.request.CreateUserDTO;
import com.quasarbet.api.dto.user.response.UserResponseDTO;
import com.quasarbet.api.entity.User;
import com.quasarbet.api.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

//import java.util.List;
//import java.util.stream.Collectors;

import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Criar um novo usuário
     */
    public UserResponseDTO create(CreateUserDTO userDTO) {
        if (userRepository.existsByCpf(userDTO.getCpf())) {
            throw new IllegalArgumentException("CPF already registered");
        }

        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = new User();

        user.setCpf(userDTO.getCpf());
        user.setEmail(userDTO.getEmail());
        user.setCountryCode(userDTO.getCountryCode());
        user.setAreaCode(userDTO.getAreaCode());
        user.setPhone(userDTO.getPhone());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setBirthDate(userDTO.getBirthDate());
        user.setPasswordHash(
            passwordEncoder.encode(userDTO.getPassword())
        );

        String referralCode;
        do {
            referralCode = generateReferralCode();
        } while (userRepository.existsByReferralCode(referralCode));

        user.setReferralCode(referralCode);

        User savedUser = userRepository.save(user);
        
        return new UserResponseDTO(
            savedUser.getId(),
            savedUser.getReferralCode(),
            savedUser.getFirstName(),
            savedUser.getCreatedAt()
        );
    }

    private String generateReferralCode() {

        return UUID.randomUUID()
                .toString()
                .replace("-", "")
                .substring(0, 8)
                .toUpperCase();
    }

    /**
     * Obter todos os usuários
     */
    /*
    public List<CreateUserDTO> getAll() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }*/
    

    /**
     * Obter usuário por ID
     */
    /*
    public CreateUserDTO getById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return mapToDTO(user);
    }*/

    /**
     * Obter usuário por email
     */
    /*
    public CreateUserDTO getByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return mapToDTO(user);
    }*/

    /**
     * Atualizar usuário
     */
    /*
    public CreateUserDTO update(Long id, CreateUserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Validar se email já existe para outro usuário
        if (!user.getEmail().equals(userDTO.getEmail()) && 
            userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("Email já registrado");
        }

        user.setEmail(userDTO.getEmail());
        user.setName(userDTO.getName());
        user.setPhone(userDTO.getPhone());
        user.setActive(userDTO.getActive());

        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            user.setPassword(userDTO.getPassword());
        }

        User updatedUser = userRepository.save(user);
        return mapToDTO(updatedUser);
    }*/

    /**
     * Deletar usuário
     */
    /*
    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado");
        }
        userRepository.deleteById(id);
    }*/

    /**
     * Mapear User para UserDTO
     */
    /*
    private CreateUserDTO mapToDTO(User user) {
        return new CreateUserDTO(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                user.getName(),
                user.getPhone(),
                user.getActive()
        );
    }*/
}
