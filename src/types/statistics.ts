import type { User } from "./user";

export interface FinanceSummary {
  car?: {
    id?: number;
    sale_type?: string;
    brand?: string;
    model?: string;
    complectation?: string;
    year?: number;
    gost_number?: string;
    color?: string;
    mileage?: number;
    condition?: string;
    seats?: number;
    dry_sale_price?: string;
    actual_sold_price?: string;
    status?: string;
    image?: string;
    assigned_user?: User;
    fuel_type?: string;
    transmission?: string;
    purchase_amount?: number;
    equipment_price?: number;
    final_price?: number;
    repair_status?: string;
    repair_price?: number;
    repair_ready_date?: string;
    ready_date?: string;
    comment?: string;
    media?: string;
    before_image?: string;
    after_image?: string;
    redemption_price?: string;
    redemption_percentage?: number;
    calculated_redemption_price?: number;
    created_at?: string;
    updated_at?: string;
    is_available?: boolean;
    full_name?: string;
    is_assigned?: boolean;
    locations?: unknown[];
    images?: string[];
  };
  gost_number?: string;
  complectation?: string;
  dry_sale_price?: number;
  actual_sold_price?: number;
  stavka?: number;
  buyout_sale_price?: number;
  initial_payment?: number;
  remaining_amount?: number;
  monthly_payment?: number;
  buyout_period_months?: number;
  payment_date?: string;
  payment_schedule?: { date: string; amount: number }[];
  monthly_payment_breakdown?: {
    month: number;
    amount: number;
    running_total: number;
  }[];
  total_payment_amount?: number;
  is_paid?: boolean;
  status?: string;
  created_at?: string;
  updated_at?: string;
  handover_to_user?: {
    id?: number;
    username?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    email?: string;
    address?: string;
    latitude?: string | null;
    longitude?: string | null;
    role?: string;
    date_joined?: string;
    telegram_username?: string;
  };
  is_redemption?: boolean;
}

export interface ReassignSummary {
  handover_to_user?: {
    id?: number;
    username?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    email?: string;
    address?: string;
    latitude?: string | null;
    longitude?: string | null;
    role?: string;
    date_joined?: string;
    telegram_username?: string;
  };
  status?: string;
  handover_description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SoldSummary {
  status?: string;
  actual_sold_price?: number;
  buyout_sale_price?: number;
  handover_to_user?: {
    id?: number;
    username?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    email?: string;
    address?: string;
    latitude?: string | null;
    longitude?: string | null;
    role?: string;
    date_joined?: string;
    telegram_username?: string;
  };
  is_paid?: boolean;
  total_payment_amount?: number;
  created_at?: string;
  updated_at?: string;
}
