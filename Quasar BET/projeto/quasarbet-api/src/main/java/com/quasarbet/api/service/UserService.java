package com.quasarbet.api.service;

import com.quasarbet.api.dto.user.request.CreateUserDTO;
import com.quasarbet.api.dto.user.response.UserResponseDTO;
import com.quasarbet.api.entity.User;
import com.quasarbet.api.exception.ResourceConflictException;
import com.quasarbet.api.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ReferralCodeGenerator referralCodeGenerator;
    private final UserTokenService userTokenService;

    public UserService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        ReferralCodeGenerator referralCodeGenerator,
        UserTokenService userTokenService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.referralCodeGenerator = referralCodeGenerator;
        this.userTokenService = userTokenService;
    }

    @Transactional
    public UserResponseDTO create(CreateUserDTO userDTO) {
        if (userRepository.existsByCpf(userDTO.getCpf())) {
            throw new ResourceConflictException("cpf", "ALREADY_EXISTS", "CPF já cadastrado");
        }

        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new ResourceConflictException("email", "ALREADY_EXISTS", "E-mail já cadastrado");
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
        user.setPasswordHash(passwordEncoder.encode(userDTO.getPassword()));
        user.setReferralCode(referralCodeGenerator.generate());

        User savedUser = userRepository.save(user);

        userTokenService.issueEmailConfirmation(savedUser);
        String verifyEmailToken = userTokenService.issueVerifyEmailSession(savedUser);

        return new UserResponseDTO(
            savedUser.getId(),
            savedUser.getFirstName() + " " + savedUser.getLastName(),
            savedUser.getEmail(),
            savedUser.getCreatedAt(),
            verifyEmailToken
        );
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
            .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        return mapToDTO(user);
    }*/

    /**
     * Obter usuário por email
     */
    /*
    public CreateUserDTO getByEmail(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        return mapToDTO(user);
    }*/

    /**
     * Atualizar usuário
     */
    /*
    public CreateUserDTO update(Long id, CreateUserDTO userDTO) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

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
            throw new ResourceNotFoundException("Usuário não encontrado");
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