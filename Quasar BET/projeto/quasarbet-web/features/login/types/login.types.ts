export interface LoginPayload {
  emailOrCpf: string;
  password: string;
}

export interface LoginFormValues extends LoginPayload {}

export type LoginFieldName = keyof LoginFormValues;