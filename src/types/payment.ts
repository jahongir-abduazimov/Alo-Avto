export interface Payment {
  id: number;
  rental_id: number;
  user_id: number;
  amount: string;
  method: "card" | "office";
  type: "full" | "schedule";
  status: "pending" | "confirmed" | "rejected" | "unpaid";
  proof?: string;
  office_appointment_date?: string;
  office_notes?: string;
  transaction_id?: string;
  payment_gateway?: string;
  invoice_number: string;
  payment_date: string | null;
  due_date: string | null;
  created_at: string;
  notes?: string;
  month_number?: number; // Only for schedule payments
  rental_car_name?: string;
  rental_status?: string;
  // Additional fields from API response
  user_first_name?: string;
  user_last_name?: string;
  user_full_name?: string;
  car_gost_number?: string;
  car_brand?: string;
  car_model?: string;
  car_full_name?: string;
  rental?: any; // Full rental object
  user?: any; // Full user object
}

export interface PaymentListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Payment[];
}

export interface UpcomingPayment {
  rental_id: number;
  rental_info: string;
  amount: number;
  due_date: string;
  is_overdue: boolean;
  days_remaining: number;
}

export interface SavedCard {
  id: number;
  user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    address: string;
    latitude: number | null;
    longitude: number | null;
    role: string;
    date_joined: string;
    telegram_username: string | null;
  };
  category: {
    id: number;
    name: string;
    code: string;
    description: string;
    icon: string | null;
    color: string;
    is_active: boolean;
    sort_order: number;
    cards_count: number;
    created_at: string;
    updated_at: string;
  };
  card_holder_first_name: string;
  card_holder_last_name: string;
  card_holder_full_name: string;
  card_number_masked: string;
  card_number_last4: string;
  expiry_date: string;
  card_image: string | null;
  bank_name: string;
  notes: string;
  is_default: boolean;
  is_active: boolean;
  is_expired: boolean;
  display_name: string;
  created_at: string;
  updated_at: string;
}

export interface SavedCardResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SavedCard[];
}

export interface CompletedPayment extends Payment {
  rental?: {
    id: number;
    car: {
      id: number;
      brand: string;
      model: string;
      name: string;
      gost_number: string;
    };
    dry_sale_price: string;
    actual_sold_price: string;
    buyout_sale_price: string;
    initial_payment: string;
    monthly_payment: string;
    buyout_period_months: number;
    payment_date: string;
    status: string;
    created_at: string;
  };
  payment_schedule?: Array<{
    date: string;
    amount: number;
    status: string;
  }>;
}

export interface CompletedPaymentResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CompletedPayment[];
}
