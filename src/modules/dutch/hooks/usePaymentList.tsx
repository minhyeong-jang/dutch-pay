import { useState } from 'react';

import { uuidv4 } from '../../../utils';

export interface PaymentItem {
  key: string;
  title: string;
  paymentPrice: number;
  payerName: string;
  participants: string[];
  status: 'new' | 'update' | 'complete';
}

export const initialPaymentItem = (): PaymentItem => ({
  key: uuidv4(),
  participants: [],
  payerName: '',
  paymentPrice: 0,
  status: 'new',
  title: '',
});

export const usePaymentList = () => {
  const [paymentList, setPaymentList] = useState<PaymentItem[]>([]);

  const addPayment = () => {
    console.log('test');
  };
  const removePayment = () => {
    console.log('test');
  };
  const editPayment = () => {
    console.log('test');
  };

  return {
    addPayment,
    editPayment,
    paymentList,
    removePayment,
    setPaymentList,
  };
};
