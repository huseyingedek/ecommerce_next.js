import { useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

type FetchReturn<T> = [
  (apiPathFirst?: string, headers?: Record<string, string>) => Promise<void>,
  T | null,
  boolean
];

interface FetchApiState<T> {
  loading: boolean;
  data: T | null;
  error: string | null;
}

interface ApiResponse {
  message: string;
}

interface UseFetchApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

const useFetchApi = <T>(apiPath?: string, options?: UseFetchApiOptions<T>): FetchReturn<T> => {
  const [responseData, setResponseData] = useState<FetchApiState<T>>({
    loading: false,
    error: null,
    data: null,
  });

  const fetchApi = async (apiPathFirst?: string, headers?: Record<string, string>) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    setResponseData(prevState => ({ ...prevState, loading: true }));

    if (!apiPath && !apiPathFirst) {
      setResponseData({ data: null, error: "API path is required.", loading: false });
      return;
    }

    const requestOptions = {
      url: `${apiUrl}${apiPathFirst || apiPath}`,
      method: "GET",
      headers: headers || {},
    };

    try {
      const response: AxiosResponse<T> = await axios(requestOptions);
      setResponseData({ data: response.data, error: null, loading: false });
      if (options?.onSuccess) {
        options.onSuccess(response.data);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data?.message || axiosError.message || "An unknown error occurred.";
      setResponseData({
        data: null,
        error: errorMessage,
        loading: false,
      });
      if (options?.onError) {
        options.onError(errorMessage);
      }
    }
  };

  return [fetchApi, responseData.data, responseData.loading];
};

export default useFetchApi;
