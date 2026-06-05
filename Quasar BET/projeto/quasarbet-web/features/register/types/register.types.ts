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

export interface RegisterFormValues extends RegisterPayload {
  confirmPassword: string;
  referralCode: string;
  acceptTerms: boolean;
}

export type RegisterTextFieldName = Exclude<keyof RegisterFormValues, "acceptTerms">;