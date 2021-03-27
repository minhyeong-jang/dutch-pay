import { PaymentItem, UserItem } from '../modules/dutch/hooks';

export interface TemplateItem {
  id: string;
  templateName: string;
  userList: UserItem[];
  paymentList: PaymentItem[];
}
