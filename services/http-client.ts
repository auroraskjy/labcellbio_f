// File: src/api/httpClient.ts
export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface FetchOptions extends RequestInit {
  /** Query parameters to append to the URL */
  params?: Record<string, string>;
}

export const BASE_URL = "http://218.155.112.84:3000";

class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(endpoint, this.baseURL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url.toString();
  }

  async fetchJSON<T>(
    endpoint: string,
    method: RequestMethod = "GET",
    options: FetchOptions = {}
  ): Promise<T> {
    const { params, signal, ...init } = options;
    const url = this.buildUrl(endpoint, params);
    const response = await fetch(url, {
      method,
      signal,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
      },
      ...init,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }
    return data;
  }

  get<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    return this.fetchJSON<T>(endpoint, "GET", options);
  }

  post<T>(
    endpoint: string,
    data: unknown,
    options: FetchOptions = {}
  ): Promise<T> {
    return this.fetchJSON<T>(endpoint, "POST", {
      body: JSON.stringify(data),
      ...options,
    });
  }

  put<T>(
    endpoint: string,
    data: unknown,
    options: FetchOptions = {}
  ): Promise<T> {
    return this.fetchJSON<T>(endpoint, "PUT", {
      body: JSON.stringify(data),
      ...options,
    });
  }

  delete<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    return this.fetchJSON<T>(endpoint, "DELETE", options);
  }
}

export const httpClient = new HttpClient(BASE_URL);
