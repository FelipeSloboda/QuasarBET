export interface LoginPayload {
  emailOrCpf: string;
  password: string;
}

export interface RegisterPayload {
  cpf: string;
  email: string;
  countryCode: string;
  areaCode: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}