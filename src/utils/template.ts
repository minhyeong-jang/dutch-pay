import { TemplateItem } from '../types';

export const generateTemplate = (): TemplateItem => ({
  id: (+new Date() + Math.random() * 100).toString(32),
  paymentList: [],
  templateName: 'New Template',
  userList: [],
});
