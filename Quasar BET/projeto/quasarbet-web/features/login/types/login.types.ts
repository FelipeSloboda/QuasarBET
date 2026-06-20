export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginFormValues extends LoginPayload {}

export type LoginFieldName = keyof LoginFormValues;