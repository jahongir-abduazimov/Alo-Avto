import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to check if a JWT token is expired
export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  try {
    // Get the payload part of the JWT (second part)
    const payload = token.split(".")[1];
    if (!payload) return true;

    // Decode the base64 payload
    const decodedPayload = JSON.parse(atob(payload));

    // Check if the token has an expiration claim
    if (!decodedPayload.exp) return true;

    // Compare the expiration time with the current time
    const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
    return decodedPayload.exp < currentTime;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true; // If there's an error, consider the token expired
  }
}

// Function to handle token expiration and redirect to login
export function handleTokenExpiration(): boolean {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("access_token");

  if (isTokenExpired(token)) {
    // Clear tokens and user data
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    // Clear cookies
    document.cookie =
      "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie =
      "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";

    // Redirect to login page
    window.location.href = "/login";
    return true;
  }

  return false;
}
