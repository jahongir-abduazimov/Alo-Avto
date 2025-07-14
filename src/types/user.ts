export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
  date_joined: string;
  telegram_username?: string;
  rentals?: Rental;
}

export interface PaymentScheduleItem {
  date: string;
  amount: number;
  status: string;
  paid: boolean;
  payment_id: number;
}

export interface MonthlyPayment {
  month_number: number;
  date: string;
  amount: number;
  is_paid: boolean;
  payment_id: number | null;
  payment_status: string;
  payment_date: string | null;
}

export interface PaymentProgress {
  rental_id: number;
  car_name: string;
  total_paid: number;
  total_required: number;
  progress_percentage: number;
  paid_months: number;
  total_months: number;
  remaining_amount: number;
  is_paid: boolean;
}

export interface Rental {
  id: number;
  car_id?: number;
  car_name?: string;
  gost_number: string;
  complectation: string;
  dry_sale_price: string;
  actual_sold_price: string;
  stavka: string;
  buyout_sale_price: string;
  initial_payment: string;
  remaining_amount: string;
  monthly_payment: string;
  handover_to_user: User;
  buyout_period_months: number;
  payment_date: string;
  payment_schedule: {
    date: string;
    amount: number;
    status: string;
    paid: boolean;
    payment_id: number;
  }[];
  schedule_statuses?: {
    date: string;
    amount: number;
    paid: boolean;
    payment_id: number | null;
    status: string;
    payment_date?: string | null;
  }[];
  is_paid: boolean;
  status: string;
  handover_description: string;
  car_photo: string;
  created_at: string;
  updated_at: string;
  total_payment_amount: number;
  monthly_payments: MonthlyPayment[];
}

export interface Payment {
  id: number;
  amount: string;
  type: "full" | "schedule";
  method: "card" | "office";
  status: "pending" | "confirmed" | "rejected" | "unpaid";
  payment_date: string | null;
  due_date: string | null;
  created_at: string;
  invoice_number: string;
  rental_id: number;
  rental_car_name: string;
  rental_status: string;
}

export interface UserProfileResponse {
  user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    role: string;
    date_joined: string;
    telegram_username: string | null;
    email: string;
    address: string;
    passport_image: string | null;
    drivers_license_image: string | null;
    contract_document_image: string | null;
    rentals: Rental[];
    payments: Payment[];
    active_rentals_count: number;
    total_rentals_count: number;
    total_paid_amount: number;
    pending_payments_count: number;
    payment_progress: PaymentProgress[];
  };
}

// Client registration interfaces
export interface ClientRegistrationPayload {
  first_name: string;
  last_name: string;
  phone_number?: string;
  email?: string;
  telegram_username?: string;
  address?: string;
  passport_image?: File;
  drivers_license_image?: File;
  contract_document_image?: File;
}

export interface ClientRegistrationResponse {
  message: string;
  user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    role: string;
    date_joined: string;
    telegram_username: string;
  };
}

export interface UserDetail {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  address: string;
  role: string;
  date_joined: string;
  telegram_username: string;
}

export interface Car {
  id: number;
  brand: string;
  model: string;
  complectation: string;
  year?: number;
  gost_number?: string;
  color?: string;
  image?: string;
}

export interface Client {
  id: number;
  username?: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email?: string;
  address?: string;
  telegram_username?: string;
  role?: string;
  car: {
    name: string;
    registration_number: string;
    status: string;
    image?: string;
  } | null;
  rental: {
    rent_due_date: string;
  } | null;
  car_location: {
    latitude: number;
    longitude: number;
    address?: string | null;
    timestamp?: string;
  } | null;
}
