import { useState } from "react";

export interface PaymentItem {
  title: string;
  paymentPrice: number;
  payerName: string;
  participants: string[];
}

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
