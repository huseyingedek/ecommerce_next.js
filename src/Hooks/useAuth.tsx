"use strict";
import axios from "axios";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "@/Redux/slices/authSlice";
import { useRouter } from "next/router";
import { message } from "antd";
import { useEffect } from "react";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  message: string;
  user: any;
}

interface RegisterResponse {
  message: string;
}

interface ErrorResponse {
  response?: {
    data?: {
      errors?: string[];
      message?: string;
    };
  };
}

const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const login = async (submitData: { email: string; password: string }) => {
    try {
      const response = await axios.post<LoginResponse>(`${process.env.NEXT_PUBLIC_API_URL || "https://e-ticaretbe.onrender.com"}/api/auth/login`, submitData);

      const { accessToken, refreshToken, accessTokenExpiresAt, user } = response.data;

      if (accessToken && refreshToken && accessTokenExpiresAt) {
        let maxAge;
        if (accessTokenExpiresAt.endsWith('h')) {
          const hours = parseInt(accessTokenExpiresAt.replace('h', ''), 10);
          maxAge = hours * 3600;
        } else {
          const expiresAt = new Date(accessTokenExpiresAt);
          const now = new Date();
          maxAge = Math.floor((expiresAt.getTime() - now.getTime()) / 1000);
        }

        if (isNaN(maxAge) || maxAge <= 0) {
          throw new Error("Invalid expiresIn value");
        }

        setCookie("token", accessToken, { maxAge });
        setCookie("refreshToken", refreshToken, { maxAge });

        dispatch(loginUser({ token: accessToken, refreshToken, user }));

        message.success(response.data.message);
        router.push("/home");
      } else {
        message.error("Kullanıcı bilgileri alınamadı.");
      }
    } catch (error) {
      const errorMessage = (error as ErrorResponse).response?.data?.errors?.[0] || (error as ErrorResponse).response?.data?.message || "Bilgileri kontrol ederek tekrar deneyiniz";
      message.error(errorMessage);
      console.error("Login error:", error);
    }
  };

  const register = async (submitData: { name: string; lastName: string; email: string; password: string; phone: string; }) => {
    try {
      const response = await axios.post<RegisterResponse>(`${process.env.NEXT_PUBLIC_API_URL || "https://e-ticaretbe.onrender.com"}/api/auth/register`, submitData);
      message.success(response.data.message);
      router.push("/");
    } catch (error) {
      const errorMessage = (error as ErrorResponse).response?.data?.errors?.[0] || (error as ErrorResponse).response?.data?.message || "Bilgileri kontrol ederek tekrar deneyiniz";
      message.error(errorMessage);
      console.error("Register error:", error);
    }
  };

  const logout = async () => {

    deleteCookie("token");
    deleteCookie("refreshToken");

    dispatch(logoutUser());
    // try {
    //   const token = getCookie("token");
    //   if (!token) {
    //     message.error("Token bulunamadı.");
    //     return;
    //   }

    //   const response = await axios.post<{ message: string }>(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, { token });
    //   deleteCookie("token");
    //   deleteCookie("refreshToken");

    //   dispatch(logoutUser());

    //   message.success(response.data.message);
    //   router.push("/");
    // } catch (error) {
    //   const errorMessage = (error as ErrorResponse).response?.data?.message || "Çıkış yaparken bir hata oluştu.";
    //   message.error(errorMessage);
    //   console.error("Logout error:", error);
    // }
  };

  const check = async () => {
    const token = getCookie("token");
    console.log("Check token:", token);
    if (!token) {
      dispatch(logoutUser());
      return false;
    }

    try {
      const response = await axios.post<{ user: any }>(`${process.env.NEXT_PUBLIC_API_URL || "https://e-ticaretbe.onrender.com"}/api/auth/check`, { token });
      dispatch(loginUser({ token, refreshToken: getCookie("refreshToken") || "", user: response.data.user }));
      return true;
    } catch (error) {
      console.error("Check error:", error);
      dispatch(logoutUser());
      return false;
    }
  };

  useEffect(() => {
    check();
  }, []);

  return { login, register, logout, check };
};

export default useAuth;