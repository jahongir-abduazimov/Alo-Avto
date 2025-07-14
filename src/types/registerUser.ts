export interface RegisterUserPayload {
  username: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  telegram_username?: string;
}
