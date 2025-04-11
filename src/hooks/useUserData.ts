import { useQuery } from "react-query";

import type User from "@/types/User";
import type Account from "@/types/Account";
import type Contact from "@/types/Contact";
import { useNavigate } from "react-router-dom";

export type LoggedUser = {
  user?: User;
  account: Account;
  contact: Contact;
  globalDiscount: number;
};

const getUser = async (): Promise<LoggedUser> => {
  const res = await fetch(
    `/api/platform/custom/logged-contact${import.meta.env.DEV ? ".json" : ""}`
  );

  if (res.status === 520) {
    throw new Error("access-denied");
  }

  if (!res.ok || res.status !== 200) {
    throw new Error("fetch-failed");
  }

  return await res.json();
};

export const useUserData = () => {
  const navigate = useNavigate();

  const { data, isFetched, isLoading, error } = useQuery(`user`, getUser, {
    retry: false,
    refetchOnWindowFocus: false,
    onError: (error) => {
      const msg = error as Error;
      navigate(`/error?error=${msg.message}`);
    },
  });

  return {
    userData: data,
    userIsFetched: isFetched,
    userIsLoading: isLoading,
    error,
  };
};
