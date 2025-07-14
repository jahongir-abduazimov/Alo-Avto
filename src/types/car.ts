export interface Car {
  id: number;
  brand: string;
  model: string;
  name: string;
  year: number;
  daily_price: string;
  image: string;
  gost_number?: string;
  sale_type?: "redemption" | "purchase" | "dry_sale";
  status:
    | "available"
    | "unavailable"
    | "active"
    | "sold"
    | "reserved"
    | "maintenance"
    | "new"
    | "not_required"
    | "repair"
    | "in_repair"
    | "in_preparation"
    | "ready"
    | "handed_over"
    | "returned"
    | "for_sale"
    | "reassignment"
    | "hand_over";
  is_available: boolean;
  full_name: string;
  complectation?: string;
  dry_sale_price?: string;
  actual_sold_price?: string;
  redemption_price?: string;
  color?: string;
  mileage?: number;
  condition?: string;
  seats?: number;
  fuel_type?: string;
  transmission?: string;
  purchase_amount?: number | null;
  equipment_price?: number | null;
  final_price?: number | null;
  repair_status?: string | null;
  repair_price?: number | null;
  repair_ready_date?: string | null;
  ready_date?: string | null;
  comment?: string | null;
  media?: string | null;
  before_image?: string | null;
  after_image?: string | null;
  redemption_percentage?: number;
  calculated_redemption_price?: number;
  created_at?: string;
  updated_at?: string;
  is_assigned?: boolean;
  locations?: unknown[];
  images?: string[];
}

export interface CarListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Car[];
}
