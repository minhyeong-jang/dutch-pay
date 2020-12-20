import { useState } from "react";

export interface PaymentItem {
  title: string;
  paymentPrice: number;
  payerName: string;
  participants: string[];
  status: "new" | "update" | "complete";
}

export const initialPaymentItem: PaymentItem = {
  title: "",
  paymentPrice: 0,
  payerName: "",
  participants: [],
  status: "new",
};

export const usePaymentList = () => {
  const [paymentList, setPaymentList] = useState<PaymentItem[]>([]);

  const addPayment = () => {};
  const removePayment = () => {};
  const editPayment = () => {};

  return {
    paymentList,
    setPaymentList,
    addPayment,
    removePayment,
    editPayment,
  };
};
