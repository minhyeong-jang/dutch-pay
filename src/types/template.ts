import { PaymentItem } from './payment';
import { UserItem } from './user';

export interface TemplateItem {
  id: string;
  templateName: string;
  userList: UserItem[];
  paymentList: PaymentItem[];
}
