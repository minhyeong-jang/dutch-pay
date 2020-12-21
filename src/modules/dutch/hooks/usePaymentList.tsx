import { useState } from 'react';

export interface PaymentItem {
  title: string;
  paymentPrice: number;
  payerName: string;
  participants: string[];
  status: 'new' | 'update' | 'complete';
}

export const initialPaymentItem: PaymentItem = {
  participants: [],
  payerName: '',
  paymentPrice: 0,
  status: 'new',
  title: '',
};

export const usePaymentList = () => {
  const [paymentList, setPaymentList] = useState<PaymentItem[]>([]);

  const addPayment = () => {};
  const removePayment = () => {};
  const editPayment = () => {};

  return {
    addPayment,
    editPayment,
    paymentList,
    removePayment,
    setPaymentList,
  };
};
