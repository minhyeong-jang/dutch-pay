import { PaymentItem, TemplateItem, UserItem } from '../types';
import { generateTemplate } from '../utils';

const CREATE_TEMPLATE = 'template/CREATE_TEMPLATE' as const;
const SET_TEMPLATE_LIST = 'template/SET_TEMPLATE_LIST' as const;
const UPDATE_TEMPLATE_LIST = 'template/UPDATE_TEMPLATE_LIST' as const;
const UPDATE_SELECTED_ID = 'template/UPDATE_SELECTED_ID' as const;
const DELETE_TEMPLATE_USER = 'template/DELETE_TEMPLATE_USER' as const;
const UPDATE_TEMPLATE_USER_LIST = 'template/UPDATE_TEMPLATE_USER_LIST' as const;
const UPDATE_TEMPLATE_PAYMENT_LIST = 'template/UPDATE_TEMPLATE_PAYMENT_LIST' as const;

export const createTemplate = () => ({
  type: CREATE_TEMPLATE,
});
export const setTemplateList = (payload: TemplateItem[]) => ({
  payload,
  type: SET_TEMPLATE_LIST,
});
interface UpdateTemplateList {
  templateList: TemplateItem[];
}
export const updateTemplateList = (payload: UpdateTemplateList) => ({
  payload,
  type: UPDATE_TEMPLATE_LIST,
});
interface UpdateSelectedId {
  templateId: string;
}
export const updateSelectedId = (payload: UpdateSelectedId) => ({
  payload,
  type: UPDATE_SELECTED_ID,
});
interface DeleteTemplateUser {
  userName: string;
}
export const deleteTemplateUser = (payload: DeleteTemplateUser) => ({
  payload,
  type: DELETE_TEMPLATE_USER,
});
interface UpdateTemplateUserList {
  userList: UserItem[];
}
export const updateTemplateUserList = (payload: UpdateTemplateUserList) => ({
  payload,
  type: UPDATE_TEMPLATE_USER_LIST,
});

interface UpdateTemplatePaymentList {
  paymentList: PaymentItem[];
}
export const updateTemplatePaymentList = (
  payload: UpdateTemplatePaymentList,
) => ({
  payload,
  type: UPDATE_TEMPLATE_PAYMENT_LIST,
});

type TemplateAction =
  | ReturnType<typeof createTemplate>
  | ReturnType<typeof setTemplateList>
  | ReturnType<typeof updateTemplateList>
  | ReturnType<typeof updateSelectedId>
  | ReturnType<typeof deleteTemplateUser>
  | ReturnType<typeof updateTemplateUserList>
  | ReturnType<typeof updateTemplatePaymentList>;

type TemplateState = {
  selectedId: string;
  templateList: TemplateItem[];
};

const initialState: TemplateState = {
  selectedId: '',
  templateList: [generateTemplate()],
};

function template(
  state: TemplateState = initialState,
  action: TemplateAction,
): TemplateState {
  switch (action.type) {
    case CREATE_TEMPLATE: {
      const attachTemplateList = [...state.templateList, generateTemplate()];
      localStorage.setItem('templateList', JSON.stringify(attachTemplateList));
      return { ...state, templateList: attachTemplateList };
    }
    case SET_TEMPLATE_LIST: {
      return { ...state, templateList: action.payload };
    }
    case UPDATE_TEMPLATE_LIST: {
      localStorage.setItem(
        'templateList',
        JSON.stringify(action.payload.templateList),
      );
      return { ...state, templateList: action.payload.templateList };
    }
    case UPDATE_SELECTED_ID: {
      return { ...state, selectedId: action.payload.templateId };
    }
    case DELETE_TEMPLATE_USER: {
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
    }
    case UPDATE_TEMPLATE_USER_LIST: {
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
    }
    case UPDATE_TEMPLATE_PAYMENT_LIST: {
      const targetIndex = state.templateList.findIndex(
        (item) => item.id === state.selectedId,
      );
      if (targetIndex === -1) {
        return state;
      }
      const copyTemplateList = [...state.templateList];
      copyTemplateList[targetIndex].paymentList = action.payload.paymentList;
      localStorage.setItem('templateList', JSON.stringify(copyTemplateList));
      return { ...state, templateList: copyTemplateList };
    }
    default:
      return state;
  }
}

export default template;
