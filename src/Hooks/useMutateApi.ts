import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { getCookie } from "cookies-next";

interface IApiState {
  loading: boolean;
  error: string | null;
  data: any | null;
  status?: number;
}

const useApi = () => {
  const [responseData, setResponseData] = useState<IApiState>({
    loading: false,
    error: null,
    data: null,
  });

  const apiRequest = async (
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint: string,
    data?: object,
    params?: object
  ): Promise<IApiState> => {
    setResponseData({ loading: true, error: null, data: null });

    const token = getCookie("token") as string | undefined;

    const axiosConfig = {
      method,
      url: `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      data: method !== "GET" ? data : undefined,
      params: method === "GET" ? params : undefined,
    };

    try {
      const response: AxiosResponse = await axios(axiosConfig);
      setResponseData({
        loading: false,
        error: null,
        data: response.data,
        status: response.status,
      });
      return {
        loading: false,
        error: null,
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      const errorResponse = error.response
        ? error.response
        : { status: 500, data: { message: "Bir hata oluştu. Lütfen tekrar deneyiniz." } };
      setResponseData({
        loading: false,
        error: errorResponse.data.message || "Bir hata oluştu. Lütfen tekrar deneyiniz.",
        data: null,
        status: errorResponse.status || 500,
      });
      return {
        loading: false,
        error: errorResponse.data.message || "Bir hata oluştu. Lütfen tekrar deneyiniz.",
        data: null,
        status: errorResponse.status || 500,
      };
    }
  };

  return {
    apiRequest,
    loading: responseData.loading,
    error: responseData.error,
    data: responseData.data,
  };
};

export default useApi;
