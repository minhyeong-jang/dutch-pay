import { TemplateItem } from '../types';
import { generatePaymentItem } from './payment';
import { uuidv4 } from './utils';

export const generateTemplate = (): TemplateItem => ({
  id: uuidv4(),
  paymentList: [generatePaymentItem()],
  templateName: 'New Template',
  userList: [],
});

export const generateExample = (): TemplateItem => ({
  id: 'sample-template',
  paymentList: [
    {
      id: '619f-bcab-3dab-9d48f',
      participants: ['둘리', '또치', '도우너', '고길동'],
      payerName: '고길동',
      paymentPrice: 53000,
      title: '집 수리비',
    },
    {
      id: '02d2-3f4a-0160-5240e',
      participants: ['둘리', '또치', '도우너'],
      payerName: '둘리',
      paymentPrice: 6300,
      title: '과자',
    },
    {
      id: '1f8b-3920-74e5-b7474',
      participants: ['또치', '고길동', '도우너'],
      payerName: '도우너',
      paymentPrice: 88000,
      title: '마법 바이올린',
    },
    {
      id: '7cd2-314d-b9c2-32d42',
      participants: ['둘리', '또치'],
      payerName: '고길동',
      paymentPrice: 78000,
      title: '선풍기 수리비',
    },
  ],
  templateName: 'Sample',
  userList: [
    { tagColor: 'pink', userName: '둘리' },
    { tagColor: 'processing', userName: '또치' },
    { tagColor: 'green', userName: '도우너' },
    { tagColor: 'warning', userName: '고길동' },
  ],
});
