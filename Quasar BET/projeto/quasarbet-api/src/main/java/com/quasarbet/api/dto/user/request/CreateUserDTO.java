package com.quasarbet.api.dto.user.request;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

public class CreateUserDTO {
    
    @NotBlank(message = "CPF é obrigatório")
    @Pattern(
        regexp = "^[0-9]{11}$",
        message = "CPF deve conter exatamente 11 dígitos"
    )
    private String cpf;

    @NotBlank(message = "E-mail é obrigatório")
    @Email(message = "E-mail inválido")
    @Size(max = 100, message = "E-mail deve ter no máximo 100 caracteres")
    private String email;

    @NotBlank(message = "Código do país é obrigatório")
    @Pattern(
        regexp = "^[0-9]{1,3}$",
        message = "Código do país deve conter entre 1 e 3 dígitos"
    )
    private String countryCode;

    @NotBlank(message = "DDD é obrigatório")
    @Pattern(
        regexp = "^[0-9]{2}$",
        message = "DDD deve conter exatamente 2 dígitos"
    )
    private String areaCode;

    @NotBlank(message = "Telefone é obrigatório")
    @Pattern(
        regexp = "^[0-9]{9}$",
        message = "Telefone deve conter exatamente 9 dígitos"
    )
    private String phone;

    @NotBlank(message = "Senha é obrigatória")
    @Size(
        min = 6,
        max = 64,
        message = "Senha deve conter entre 6 e 64 caracteres"
    )
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$",
        message = "Senha deve conter letra maiúscula, minúscula e número"
    )
    private String password;

    @NotBlank(message = "Nome é obrigatório")
    @Size(
        min = 2,
        max = 50,
        message = "Nome deve conter entre 2 e 50 caracteres"
    )
    @Pattern(
        regexp = "^[\\p{L}]+$",
        message = "Nome deve conter apenas letras"
    )
    private String firstName;

    @NotBlank(message = "Sobrenome é obrigatório")
    @Size(
        min = 2,
        max = 150,
        message = "Sobrenome deve conter entre 2 e 150 caracteres"
    )
    @Pattern(
        regexp = "^[\\p{L} ]+$",
        message = "Sobrenome deve conter apenas letras"
    )
    private String lastName;

    @NotNull(message = "Data de nascimento é obrigatória")
    @Past(message = "Data de nascimento deve estar no passado")
    private LocalDate birthDate;

    public CreateUserDTO() {}

    public CreateUserDTO(String cpf, String email, String countryCode, String areaCode,
            String phone, String password, String firstName, String lastName, LocalDate birthDate) {
        this.cpf = cpf;
        this.email = email;
        this.countryCode = countryCode;
        this.areaCode = areaCode;
        this.phone = phone;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }
}