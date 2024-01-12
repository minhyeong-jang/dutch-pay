import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PaymentItem, TemplateItem, UserItem } from '../types';
import { generateTemplate } from '../utils';

interface UpdateTemplateList {
  templateList: TemplateItem[];
}
interface UpdateSelectedId {
  templateId: string;
}
interface DeleteTemplateUser {
  userName: string;
}
interface UpdateTemplateUserList {
  userList: UserItem[];
}
interface UpdateTemplatePaymentList {
  paymentList: PaymentItem[];
}

interface TemplateState {
  selectedId: string;
  templateList: TemplateItem[];
}

const initialState: TemplateState = {
  selectedId: '',
  templateList: [generateTemplate()],
};

export const templateRedux = createSlice({
  name: 'template',
  initialState,
  reducers: {
    createTemplate: (state) => {
      const attachTemplateList = [...state.templateList, generateTemplate()];
      localStorage.setItem('templateList', JSON.stringify(attachTemplateList));
      return { ...state, templateList: attachTemplateList };
    },
    setTemplateList: (state, action: PayloadAction<TemplateItem[]>) => {
      return { ...state, templateList: action.payload };
    },
    updateTemplateList: (state, action: PayloadAction<UpdateTemplateList>) => {
      localStorage.setItem(
        'templateList',
        JSON.stringify(action.payload.templateList),
      );
      return { ...state, templateList: action.payload.templateList };
    },
    updateSelectedId: (state, action: PayloadAction<UpdateSelectedId>) => {
      return { ...state, selectedId: action.payload.templateId };
    },
    deleteTemplateUser: (state, action: PayloadAction<DeleteTemplateUser>) => {
      const targetIndex = state.templateList.findIndex(
        (item) => item.id === state.selectedId,
      );
      if (targetIndex === -1) {
        return state;
      }
      const copyTemplateList = [...state.templateList];
      const filterUserList = copyTemplateList[targetIndex].userList.filter(
        (user) => user.userName !== action.payload.userName,
      );
      const filterPaymentList = copyTemplateList[targetIndex].paymentList.map(
        (payment) => ({
          ...payment,
          participants: payment.participants.filter(
            (item) => item !== action.payload.userName,
          ),
        }),
      );
      copyTemplateList[targetIndex].userList = filterUserList;
      copyTemplateList[targetIndex].paymentList = filterPaymentList;
      localStorage.setItem('templateList', JSON.stringify(copyTemplateList));
      return { ...state, templateList: copyTemplateList };
    },
    updateTemplateUserList: (
      state,
      action: PayloadAction<UpdateTemplateUserList>,
    ) => {
      const targetIndex = state.templateList.findIndex(
        (item) => item.id === state.selectedId,
      );
      if (targetIndex === -1) {
        return state;
      }
      const copyTemplateList = [...state.templateList];
      copyTemplateList[targetIndex].userList = action.payload.userList;
      localStorage.setItem('templateList', JSON.stringify(copyTemplateList));
      return { ...state, templateList: copyTemplateList };
    },
    updateTemplatePaymentList: (
      state,
      action: PayloadAction<UpdateTemplatePaymentList>,
    ) => {
      const targetIndex = state.templateList.findIndex(
        (item) => item.id === state.selectedId,
      );
      if (targetIndex === -1) {
        return state;
      }
      const copyTemplateList = JSON.parse(
        JSON.stringify(state.templateList),
      ) as TemplateItem[];
      copyTemplateList[targetIndex].paymentList = action.payload.paymentList;
      localStorage.setItem('templateList', JSON.stringify(copyTemplateList));
      return { ...state, templateList: copyTemplateList };
    },
  },
});

export const {
  createTemplate,
  setTemplateList,
  updateTemplateList,
  updateSelectedId,
  deleteTemplateUser,
  updateTemplateUserList,
  updateTemplatePaymentList,
} = templateRedux.actions;

export default templateRedux.reducer;
