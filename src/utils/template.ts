import { TemplateItem } from '../types';
import { generatePaymentItem } from './payment';
import { uuidv4 } from './utils';

export const generateTemplate = (): TemplateItem => ({
  id: uuidv4(),
  paymentList: [generatePaymentItem()],
  templateName: 'New Template',
  userList: [],
});
