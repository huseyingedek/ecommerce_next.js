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

const useFetchApi = <T>(apiPath?: string): FetchReturn<T> => {
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
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      setResponseData({
        data: null,
        error: axiosError.response?.data?.message || axiosError.message || "An unknown error occurred.",
        loading: false,
      });
    }
  };

  return [fetchApi, responseData.data, responseData.loading];
};

export default useFetchApi;
