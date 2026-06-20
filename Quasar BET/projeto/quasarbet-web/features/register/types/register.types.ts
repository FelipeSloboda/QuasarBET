export interface UserRegisterResponse {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  verifyEmailToken: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
  countryCode: string;
  areaCode: string;
  phone: string;
  password: string;
  birthDate: string;
}

export interface RegisterFormValues {
  fullName: string;
  cpf: string;
  email: string;
  countryCode: string;
  areaCode: string;
  phone: string;
  birthDate: string;
  password: string;
  referralCode: string;
  acceptTerms: boolean;
}

export type RegisterTextFieldName = Exclude<keyof RegisterFormValues, "acceptTerms">;