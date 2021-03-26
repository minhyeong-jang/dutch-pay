import { useEffect, useState } from 'react';

import { formatNumber, uuidv4 } from '../../../utils';
export interface PaymentItem {
  key: string;
  title: string;
  paymentPrice: number;
  payerName: string;
  participants: string[];
}

export const initialPaymentItem = (): PaymentItem => ({
  key: uuidv4(),
  participants: [],
  payerName: '',
  paymentPrice: 0,
  title: '',
});

export const usePaymentList = () => {
  const [paymentList, setPaymentList] = useState<PaymentItem[]>([]);

  useEffect(() => {
    if (!paymentList.length) {
      setPaymentList([initialPaymentItem()]);
    }
  }, []);

  const addPayment = () => {
    setPaymentList([...paymentList, initialPaymentItem()]);
  };
  const updateTitle = (value: string, index: number) => {
    const items = [...paymentList];
    items[index]['title'] = value;
    setPaymentList(items);
  };
  const updatePaymentPrice = (value: string, index: number) => {
    const items = [...paymentList];
    items[index]['paymentPrice'] = formatNumber(value);
    setPaymentList(items);
  };
  const updatePayerName = (selectedUser: string, index: number) => {
    const items = [...paymentList];
    items[index]['payerName'] = selectedUser;
    setPaymentList(items);
  };
  const updateParticipants = (value: string[], index: number) => {
    const items = [...paymentList];
    items[index]['participants'] = value;
    setPaymentList(items);
  };

  return {
    addPayment,
    paymentList,
    setPaymentList,
    updateParticipants,
    updatePayerName,
    updatePaymentPrice,
    updateTitle,
  };
};
