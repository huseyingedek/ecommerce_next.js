import { useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

type FetchReturn<T> = [
  (apiPathFirst?: string, headers?: Record<string, string>) => Promise<void>,
  T | null
];

interface ApiResponse {
  message: string;
}

interface UseFetchApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

const useFetchApi = <T>(apiPath?: string, options?: UseFetchApiOptions<T>): FetchReturn<T> => {
  const [responseData, setResponseData] = useState<T | null>(null);

  const fetchApi = async (apiPathFirst?: string, headers?: Record<string, string>) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiPath && !apiPathFirst) {
      throw new Error("API path is required.");
    }

    const requestOptions = {
      url: `${apiUrl}${apiPathFirst || apiPath}`,
      method: "GET",
      headers: headers || {},
    };

    try {
      const response: AxiosResponse<T> = await axios(requestOptions);
      setResponseData(response.data);
      if (options?.onSuccess) {
        options.onSuccess(response.data);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data?.message || axiosError.message || "An unknown error occurred.";
      if (options?.onError) {
        options.onError(errorMessage);
      }
      throw error;
    }
  };

  return [fetchApi, responseData];
};

export default useFetchApi;