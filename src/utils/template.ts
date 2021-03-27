import { TemplateItem } from '../types';
import { uuidv4 } from './utils';

export const generateTemplate = (): TemplateItem => ({
  id: uuidv4(),
  paymentList: [],
  templateName: 'New Template',
  userList: [],
});
