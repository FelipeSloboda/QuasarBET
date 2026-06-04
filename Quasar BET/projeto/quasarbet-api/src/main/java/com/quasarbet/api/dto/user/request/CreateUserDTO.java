package com.quasarbet.api.dto.user.request;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

public class CreateUserDTO {
    
    @NotBlank(message = "CPF is required")
    @Pattern(
        regexp = "^[0-9]{11}$",
        message = "CPF must contain exactly 11 digits"
    )
    private String cpf;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    @Size(max = 100, message = "Email must have a maximum of 100 characters")
    private String email;

    @NotBlank(message = "Country code is required")
    @Pattern(
        regexp = "^[0-9]{1,3}$",
        message = "Country code must contain between 1 and 3 digits"
    )
    private String countryCode;

    @NotBlank(message = "Area code is required")
    @Pattern(
        regexp = "^[0-9]{2}$",
        message = "Area code must contain exactly 2 digits"
    )
    private String areaCode;

    @NotBlank(message = "Phone is required")
    @Pattern(
        regexp = "^[0-9]{9}$",
        message = "Phone must contain exactly 9 digits"
    )
    private String phone;

    @NotBlank(message = "Password is required")
    @Size(
        min = 6,
        max = 64,
        message = "Password must contain between 6 and 64 characters"
    )
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$",
        message = "Password must contain uppercase, lowercase and number"
    )
    @Size(
        min = 8,
        max = 64,
        message = "Password must contain between 8 and 64 characters"
    )
    private String password;

    @NotBlank(message = "First name is required")
    @Size(
        min = 2,
        max = 50,
        message = "First name must contain between 2 and 50 characters"
    )
    @Pattern(
        regexp = "^[\\p{L}]+$",
        message = "First name must contain only letters"
    )
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(
        min = 2,
        max = 150,
        message = "Last name must contain between 2 and 150 characters"
    )
    @Pattern(
        regexp = "^[\\p{L} ]+$",
        message = "Last name must contain only letters"
    )
    private String lastName;

    @NotNull(message = "Birth date is required")
    @Past(message = "Birth date must be in the past")
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