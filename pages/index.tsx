import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuth } from "@/Hooks/index";

const Index: NextPage = () => {
  const { check } = useAuth();
  const router = useRouter();

  useEffect(() => {
    check();
    router.push("/home");
  }, []);

  return <></>;
};

export default Index;