// Get car stats (dashboard)
export interface StatValue {
  value: number | string;
  is_positive: boolean;
  percent_change: number | string;
  period: string;
}

export interface CarStats {
  total_income: StatValue;
  upcoming_income: StatValue;
  debt: StatValue;
  direct_income: StatValue;
}

import { RegisterUserPayload } from "@/types/registerUser";
import { isTokenExpired, handleTokenExpiration } from "@/lib/utils";
import { Client } from "@/types/user";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL! || "http://192.168.0.108:8000/api/v1";
import { CarListResponse } from "@/types/car";
import {
  User,
  ClientRegistrationPayload,
  ClientRegistrationResponse,
  UserProfileResponse,
  UserDetail,
} from "@/types/user";
import {
  PaymentListResponse,
  SavedCardResponse,
  CompletedPaymentResponse,
} from "@/types/payment";
import type { ContractDocumentListResponse } from "@/types/document";
import type {
  FinanceSummary,
  ReassignSummary,
  SoldSummary,
} from "@/types/statistics";

// get token
const getToken = () => {
  const token = localStorage.getItem("access_token");
  // Check if token is expired
  if (isTokenExpired(token) && token) {
    // Handle token expiration and redirect to login
    handleTokenExpiration();
    return null;
  }
  return token;
};
export const fetchCarStats = async (): Promise<CarStats> => {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_BASE}/cars/stats/`, {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch car stats");
  return res.json();
};
// Wrapper function to check token before making API calls
const withTokenCheck = async <T>(apiCall: () => Promise<T>): Promise<T> => {
  // Check if token is expired before making the API call
  if (typeof window !== "undefined" && handleTokenExpiration()) {
    throw new Error("Token expired");
  }

  return apiCall();
};

// get users
export const getUsers = async (): Promise<User[]> => {
  return withTokenCheck(async () => {
    const token = getToken();
    if (!token) throw new Error("No valid token");

    const res = await fetch(`${API_BASE}/users/list/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 401) {
        // Token might be expired or invalid
        if (typeof window !== "undefined") {
          handleTokenExpiration();
        }
        throw new Error("Unauthorized");
      }
      throw new Error("Foydalanuvchilarni olishda xatolik");
    }

    const data = await res.json();
    return data;
  });
};

// get cars
export const fetchCars = async (
  saleType?: string,
  filters?: {
    search?: string;
    brand?: string;
    model?: string;
    gost_number?: string;
  }
): Promise<CarListResponse> => {
  return withTokenCheck(async () => {
    const token = getToken();
    if (!token) throw new Error("No valid token");

    const url = new URL(`${API_BASE}/cars/cars/`);
    if (saleType) url.searchParams.append("sale_type", saleType);
    if (filters?.search) url.searchParams.append("search", filters.search);
    if (filters?.brand) url.searchParams.append("brand", filters.brand);
    if (filters?.model) url.searchParams.append("model", filters.model);
    if (filters?.gost_number)
      url.searchParams.append("gost_number", filters.gost_number);

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 401) {
        // Token might be expired or invalid
        if (typeof window !== "undefined") {
          handleTokenExpiration();
        }
        throw new Error("Unauthorized");
      }
      throw new Error("Mashinalarni olishda xatolik");
    }

    return res.json();
  });
};

// create car
export const createCar = async (
  data: Record<string, unknown>,
  file?: File
): Promise<void> => {
  const token = getToken();

  const formData = new FormData();

  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key] as string | Blob);
    }
  }

  if (file) {
    formData.append("image", file); // ✅ Faylni alohida qo‘shamiz
  }

  const response = await fetch(`${API_BASE}/cars/cars/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: formData,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Mashina qo‘shilmadi: ${err}`);
  }
};

// document create
export const createDocument = async (data: Record<string, unknown>) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append("file", value);
    } else if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      formData.append(key, String(value));
    }
  });
  const token = getToken();
  const res = await fetch(`${API_BASE}/documents/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error(await res.text());
};

export const getBrands = async (): Promise<string[]> => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/cars/car-data/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch brands");
  const data = await res.json();
  return data.brands;
};

export const getModels = async (brand: string): Promise<string[]> => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/cars/models/${brand}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch models");
  const data = await res.json();
  return data.models;
};

export const getComplectations = async (
  brand: string,
  model: string
): Promise<string[]> => {
  const token = getToken();
  const res = await fetch(
    `${API_BASE}/cars/complectations/${brand}/${model}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      credentials: "include",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch complectations");
  const data = await res.json();
  return data.complectations;
};

// userregistration
export const registerUser = async (
  formData: FormData
): Promise<RegisterUserPayload> => {
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  const response = await fetch(`${API_BASE}/users/register/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  if (!response.ok) {
    // Try to parse as JSON first, fallback to text if it's HTML
    let errorMessage = "Ошибка при регистрации";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.detail || errorMessage;
    } catch {
      // If JSON parsing fails, it's likely HTML, so get the text
      const errorText = await response.text();
      console.error("Server error response:", errorText);
      errorMessage = `Ошибка сервера (${response.status}): ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  return response.json();
};

// Client registration
export const registerClient = async (
  data: ClientRegistrationPayload
): Promise<ClientRegistrationResponse> => {
  const formData = new FormData();

  // Add text fields
  if (data.first_name) formData.append("first_name", data.first_name);
  if (data.last_name) formData.append("last_name", data.last_name);
  if (data.phone_number) formData.append("phone_number", data.phone_number);
  if (data.email) formData.append("email", data.email);
  if (data.telegram_username)
    formData.append("telegram_username", data.telegram_username);
  if (data.address) formData.append("address", data.address);

  // Add file fields
  if (data.passport_image)
    formData.append("passport_image", data.passport_image);
  if (data.drivers_license_image)
    formData.append("drivers_license_image", data.drivers_license_image);
  if (data.contract_document_image)
    formData.append("contract_document_image", data.contract_document_image);

  const response = await fetch(`${API_BASE}/users/clients/register/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: "application/json",
    },
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = "Ошибка при регистрации клиента";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.detail || errorMessage;
    } catch {
      const errorText = await response.text();
      console.error("Server error response:", errorText);
      errorMessage = `Ошибка сервера (${response.status}): ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  return response.json();
};

export const createRental = async (data: {
  handover_description: string;
  is_paid: boolean;
  dry_sale_price: number;
  car_id: number;
  handover_to_user_id: number;
  car_photo?: File;
  payment_date: string;
  buyout_sale_price: number;
  initial_payment: number;
  stavka: number;
  actual_sold_price: number;
  status: string;
  monthly_payment: number;
  buyout_period_months: number;
  complectation: string;
  gost_number: string;
}) => {
  const token = getToken();
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as string | Blob);
    }
  });

  const response = await fetch(`${API_BASE}/rentals/rentals/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: formData,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Аренда/выкуп не создан: ${err}`);
  }
};

export const fetchRentals = async ({ page = 1, pageSize = 10 } = {}) => {
  const token = getToken();
  const url = new URL(`${API_BASE}/rentals/rentals/`);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("page_size", pageSize.toString());
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch rentals");
  return res.json();
};

export const fetchRentalById = async (id: string | number) => {
  const token = getToken();
  console.log("fetchRentalById id:", id);
  console.log("API_BASE:", API_BASE);
  console.log("Token:", token);

  try {
    const res = await fetch(`${API_BASE}/rentals/rentals/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      credentials: "include",
    });

    console.log("Response status:", res.status);
    console.log("Response ok:", res.ok);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error Response:", errorText);
      throw new Error(
        `Failed to fetch rental: ${res.status} ${res.statusText}`
      );
    }

    const rental = await res.json();
    console.log("Rental data:", rental);

    const initialData = {
      brand: rental.car.brand,
      model: rental.car.model,
      complectation: rental.car.complectation,
      gost_number: rental.gost_number,
      dry_sale_price: rental.dry_sale_price,
      actual_sold_price: rental.actual_sold_price,
      buyout_sale_price: rental.buyout_sale_price,
      initial_payment: rental.initial_payment,
      remainder: rental.remaining_amount,
      monthly_payment: rental.monthly_payment,
      buyout_period_months: rental.buyout_period_months?.toString(),
      handover_to_user_id: rental.handover_to_user?.id?.toString(),
      handover_to_user_first_name: rental.handover_to_user?.first_name,
      handover_to_user_last_name: rental.handover_to_user?.last_name,
      payment_date: rental.payment_date,
      handover_description: rental.handover_description,
      stavka: rental.stavka,
      status: rental.status,
      car_photo: rental.car_photo,
      is_paid: rental.is_paid,
      car_id: rental.car.id,
      id: rental.id,
    };

    console.log("Initial data:", initialData);
    return initialData;
  } catch (error) {
    console.error("fetchRentalById error:", error);
    throw error;
  }
};

// Fetch rental details with payment schedule
export const fetchRentalDetails = async (id: string | number) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/rentals/rentals/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch rental details");
  }

  return res.json();
};

export const updateRental = async (
  id: string | number,
  data: Record<string, unknown>
) => {
  const token = getToken();
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as string | Blob);
    }
  });

  const response = await fetch(`${API_BASE}/rentals/rentals/${id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: formData,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Аренда/выкуп не обновлен: ${err}`);
  }
  return response.json();
};

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE}/users/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Login error:", errorText);
    throw new Error("Login failed. Please check your credentials.");
  }

  const data = await response.json();

  // Store tokens and user data in localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", data.tokens.access);
    localStorage.setItem("refresh_token", data.tokens.refresh);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Set cookies for middleware
    document.cookie = `access_token=${data.tokens.access}; path=/`;
    document.cookie = `user_role=${data.user.role}; path=/`;
  }

  return data;
};

// get user profile
export const getUserProfile = async (): Promise<UserProfileResponse> => {
  return withTokenCheck(async () => {
    const token = getToken();
    if (!token) throw new Error("No valid token");

    const res = await fetch(`${API_BASE}/users/profile/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 401) {
        // Token might be expired or invalid
        if (typeof window !== "undefined") {
          handleTokenExpiration();
        }
        throw new Error("Unauthorized");
      }
      throw new Error("Foydalanuvchi profilini olishda xatolik");
    }

    const data = await res.json();
    return data;
  });
};

// create payment
export const createPayment = async (formData: FormData): Promise<void> => {
  const token = getToken();

  const response = await fetch(`${API_BASE}/payments/payments/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка при создании платежа: ${errorText}`);
  }
};

// create multiple payments for schedule payments
export const createMultiplePayments = async (
  rentalId: number,
  paymentAmount: number,
  paymentType: "schedule" | "full",
  proof?: File
): Promise<void> => {
  const token = getToken();

  try {
    // Fetch rental details to get payment schedule
    const rentalDetails = await fetchRentalDetails(rentalId);
    const {
      payment_schedule,
      remaining_amount,
      monthly_payment,
      schedule_statuses,
    } = rentalDetails;

    if (paymentType === "schedule") {
      // For schedule payments, create one payment for the current month
      // Find the first unpaid month
      const unpaidMonth = schedule_statuses.find(
        (payment: { paid: boolean }) => !payment.paid
      );

      if (!unpaidMonth) {
        throw new Error("No unpaid months found for schedule payment");
      }

      const formData = new FormData();
      formData.append("rental_id", rentalId.toString());
      formData.append("amount", paymentAmount.toString());
      formData.append("type", "schedule");
      formData.append("method", "cash");
      formData.append(
        "month_number_input",
        unpaidMonth.month_number?.toString() || "1"
      );
      if (proof) {
        formData.append("proof", proof);
      }

      await createPayment(formData);
    } else if (paymentType === "full") {
      // For full payments, create multiple payments based on payment schedule
      const remainingAmount = parseFloat(remaining_amount);
      const monthlyPaymentAmount = parseFloat(monthly_payment);

      if (paymentAmount >= remainingAmount) {
        // If payment covers full remaining amount, create payments for all unpaid months
        const unpaidPayments = schedule_statuses.filter(
          (payment: { paid: boolean }) => !payment.paid
        );

        for (let i = 0; i < unpaidPayments.length; i++) {
          const formData = new FormData();
          formData.append("rental_id", rentalId.toString());

          let currentPaymentAmount = monthlyPaymentAmount;
          if (i === unpaidPayments.length - 1) {
            // Last payment gets the remaining amount
            const totalPaidSoFar = i * monthlyPaymentAmount;
            currentPaymentAmount = remainingAmount - totalPaidSoFar;
          }

          formData.append("amount", currentPaymentAmount.toString());
          formData.append("type", "schedule");
          formData.append("method", "cash");
          formData.append("month_number_input", (i + 1).toString());
          if (proof && i === 0) {
            // Only attach proof to first payment
            formData.append("proof", proof);
          }

          await createPayment(formData);
        }
      } else {
        // If payment is less than remaining amount, create partial payment
        const formData = new FormData();
        formData.append("rental_id", rentalId.toString());
        formData.append("amount", paymentAmount.toString());
        formData.append("type", "schedule");
        formData.append("method", "cash");
        formData.append("status", "partial");
        formData.append("month_number_input", "1"); // Default to first month for partial payments
        if (proof) {
          formData.append("proof", proof);
        }

        await createPayment(formData);
      }
    }
  } catch (error) {
    console.error("Error creating multiple payments:", error);
    throw new Error("Ошибка при создании платежей");
  }
};

// fetch payments
export const fetchPayments = async (): Promise<PaymentListResponse> => {
  const token = getToken();

  const res = await fetch(`${API_BASE}/payments/payments/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Платежини олишда хатолик");
  }

  return res.json();
};

// fetch completed payments
export const fetchCompletedPayments =
  async (): Promise<CompletedPaymentResponse> => {
    const token = getToken();

    const res = await fetch(`${API_BASE}/payments/payments/completed/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Завершенные платежини олишда хатолик");
    }

    return res.json();
  };

// fetch car by id
export const fetchCarById = async (carId: number) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/cars/cars/${carId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch car");
  return res.json();
};

// fetch upcoming payments
export const fetchUpcomingPayments = async () => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/payments/payments/upcoming/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch upcoming payments");
  return res.json();
};

// fetch available cars
export const fetchAvailableCars = async () => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/cars/cars/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch available cars");
  return res.json();
};

// Update payment status
export const updatePaymentStatus = async (
  paymentId: number,
  status: string,
  paymentType?: "full" | "schedule",
  monthNumber?: number
) => {
  const token = getToken();

  // Prepare body based on payment type
  const body: any = { status };

  // For schedule payments, include month_number
  if (paymentType === "schedule" && monthNumber) {
    body.month_number = monthNumber;
  }

  const response = await fetch(
    `${API_BASE}/payments/payments/${paymentId}/update_status/`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update payment status");
  }
  return response.json();
};

// Fetch saved cards for the current user
export const fetchSavedCards = async (): Promise<SavedCardResponse> => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/payments/saved-cards/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch saved cards");
  return res.json();
};

// Mock functions removed due to unused parameters and linter errors

/**
 * Create a contract (invoice, purchase_agreement, passport_scan, etc.)
 * @param contract_type - e.g. 'invoice', 'purchase_agreement', 'passport_scan'
 * @param title - document title
 * @param file - File to upload
 */
export const createContract = async (
  contract_type: string,
  title: string,
  file: File
) => {
  const token = getToken();
  const formData = new FormData();
  formData.append("contract_type", contract_type);
  formData.append("title", title);
  formData.append("uploaded_images", file);

  const response = await fetch(`${API_BASE}/contracts/contracts/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-CSRFTOKEN":
        "fwZgogbKDVRtK59yZFLfotlFgaBB20ZsMoVtw6qemLRcVOQXgoPaCzN6Ivgxksol",
      Accept: "application/json",
      // Do not set Content-Type for FormData
    },
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Contract upload failed: ${err}`);
  }
  return response.json();
};

export const fetchContractDocuments =
  async (): Promise<ContractDocumentListResponse> => {
    const token = getToken();
    const res = await fetch(`${API_BASE}/contracts/contracts/`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Xujjatlarni olishda xatolik");
    return res.json();
  };

export const getUserDetailById = async (
  id: string | number
): Promise<UserDetail> => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/users/user/${id}/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Foydalanuvchini olishda xatolik");
  return res.json();
};

export const updateUserDetail = async (
  id: string | number,
  data: Partial<UserDetail> & { [key: string]: unknown }
): Promise<UserDetail> => {
  const token = getToken();
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as string | Blob);
    }
  });
  const res = await fetch(`${API_BASE}/users/user/${id}/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "X-CSRFTOKEN":
        "7JwCG6xilOZgKMsRUvEvTMG6dHv2lVO8EBsPOWMM4EZZVv9gbeIq7S8xF2aYDnd1",
      // Do not set Content-Type for FormData
    },
    body: formData,
    credentials: "include",
  });
  if (!res.ok) throw new Error("Foydalanuvchini yangilashda xatolik");
  return res.json();
};

export const getFinanceSummary = async (
  rentalId: string | number
): Promise<FinanceSummary | undefined> => {
  const token = getToken();
  try {
    const res = await fetch(
      `${API_BASE}/rentals/rentals/${rentalId}/finance_summary/`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) return undefined;
    return await res.json();
  } catch {
    return undefined;
  }
};

export const getReassignSummary = async (
  rentalId: string | number
): Promise<ReassignSummary | undefined> => {
  const token = getToken();
  try {
    const res = await fetch(
      `${API_BASE}/rentals/rentals/${rentalId}/reassign/`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) return undefined;
    return await res.json();
  } catch {
    return undefined;
  }
};

export const getSoldSummary = async (
  rentalId: string | number
): Promise<SoldSummary | undefined> => {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE}/rentals/rentals/${rentalId}/sold/`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return undefined;
    return await res.json();
  } catch {
    return undefined;
  }
};

// Car evaluation API
export const evaluateCar = async (evaluationData: {
  brand: string;
  model: string;
  engine_volume: string;
  mileage: number;
  fuel: string;
  year: number;
  transmission: string;
  condition: string;
  color: string;
  owners: number;
  complectation?: string;
}) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/cars/car-evaluation/`, {
    method: "POST",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-CSRFTOKEN":
        "17p6KXBFsmKqoon5tHpSiihedsimcEdDyZljSNQ9bcK9z74uKqtNwoJFFNXiu6Cw",
    },
    body: JSON.stringify(evaluationData),
  });

  if (!res.ok) {
    throw new Error("Failed to evaluate car");
  }

  return res.json();
};

export const getClients = async (): Promise<Client[]> => {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_BASE}/users/clients/`, {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch clients");
  return res.json();
};

export const getClientById = async (id: string | number): Promise<Client> => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/users/clients/${id}/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch client");
  return res.json();
};

export const updateClient = async (
  id: string | number,
  data: Partial<Client> & { [key: string]: unknown }
): Promise<Client> => {
  const token = getToken();
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as string | Blob);
    }
  });
  const res = await fetch(`${API_BASE}/users/clients/${id}/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to update client");
  return res.json();
};

export const updateClientWithNewAPI = async (
  user_id: number,
  data: {
    first_name: string;
    last_name: string;
    username: string;
    phone_number: string;
    email?: string;
    address?: string;
    telegram_username?: string;
    password?: string;
    drivers_license_image?: File;
    passport_image?: File;
    contract_document_image?: File;
  }
): Promise<any> => {
  const token = getToken();
  const formData = new FormData();

  // Add user_id
  formData.append("user_id", user_id.toString());

  // Add text fields
  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);
  formData.append("username", data.username);
  formData.append("phone_number", data.phone_number);

  if (data.email) formData.append("email", data.email);
  if (data.address) formData.append("address", data.address);
  if (data.telegram_username)
    formData.append("telegram_username", data.telegram_username);
  if (data.password) formData.append("password", data.password);

  // Add file fields
  if (data.drivers_license_image)
    formData.append("drivers_license_image", data.drivers_license_image);
  if (data.passport_image)
    formData.append("passport_image", data.passport_image);
  if (data.contract_document_image)
    formData.append("contract_document_image", data.contract_document_image);

  const res = await fetch(`${API_BASE}/users/clients/update/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      // Don't set Content-Type for FormData
    },
    body: formData,
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to update client");
  return res.json();
};

export const deleteClient = async (id: string | number): Promise<void> => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/users/clients/${id}/`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete client");
};

// Delete rental (car return)
export const deleteRental = async (id: string | number): Promise<void> => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/rentals/rentals/${id}/`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete rental");
};
