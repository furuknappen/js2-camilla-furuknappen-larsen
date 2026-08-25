import { ApiError } from "../errors/apiError";

const BASE_URL = "https://v2.api.noroff.dev";

interface ApiClientOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

interface ApiErrorResponse {
  errors?: { message: string }[];
}

async function apiClient<T = unknown>(
  endpoint: string,
  options: ApiClientOptions = {},
): Promise<T | null> {
  const { body, ...customOptions } = options;

  // Retrieve auth info from storage
  const apiKey = localStorage.getItem("apiKey"); // Your Noroff API key

  const accessToken = localStorage.getItem("accessToken"); // The user's login token

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    From: "camlar06341@stud.noroff.no",
    "User-Agent": "Mozilla/5.0",
    ...(apiKey && { "X-Noroff-API-Key": apiKey }),
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...customOptions.headers,
  };

  const config: RequestInit = {
    method: body ? "POST" : "GET",
    ...customOptions,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(BASE_URL + endpoint, config);

    // If the response has no content (e.g., a 204 No Content), we don't try to parse it
    if (response.status === 204) {
      if (!response.ok) {
        throw new ApiError(`HTTP Error: ${response.status}`, response.status);
      }
      return null;
    }

    const responseData = await response.json();
    if (!response.ok) {
      throw new ApiError(
        responseData.errors?.[0]?.message || "An API error occurred",
        response.status,
      );
    }

    return responseData as T;
  } catch (error) {
    console.error("API Client Error:", error);
    // Re-throw the error so the calling code can handle it
    throw error;
  }
}

// Now we can export helper methods
export const get = <T = unknown>(endpoint: string): Promise<T | null> =>
  apiClient<T>(endpoint);

export const post = <T = unknown>(
  endpoint: string,
  body: unknown,
): Promise<T | null> => apiClient<T>(endpoint, { body });

export const put = <T = unknown>(
  endpoint: string,
  body: unknown,
): Promise<T | null> => apiClient<T>(endpoint, { method: "PUT", body });

export const del = <T = unknown>(endpoint: string): Promise<T | null> =>
  apiClient<T>(endpoint, { method: "DELETE" });
