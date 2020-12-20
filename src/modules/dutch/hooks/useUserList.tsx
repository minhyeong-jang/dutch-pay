import { useState } from "react";

export interface UserItem {
  userName: string;
  paymentPrice: number;
  getTossList: { [key: string]: number };
}

export const useUserList = () => {
  const [userList, setUserList] = useState([]);

  return {
    userList,
    setUserList,
  };
};
