import { PaymentItem, UserItem } from '../../dutch/hooks';

export interface TemplateItem {
  templateName: string;
  userList: UserItem[];
  paymentList: PaymentItem[];
}
