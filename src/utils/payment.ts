import { PaymentItem } from '../types';
import { uuidv4 } from './utils';

export const generatePaymentItem = (): PaymentItem => ({
  id: uuidv4(),
  participants: [],
  payerName: '',
  paymentPrice: 0,
  title: '',
});
