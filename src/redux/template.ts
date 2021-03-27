import { UserItem } from '../modules/dutch/hooks';
import { TemplateItem } from '../types';
import { generateTemplate } from '../utils/template';

const CREATE_TEMPLATE = 'template/CREATE_TEMPLATE' as const;
const SET_TEMPLATE_LIST = 'template/SET_TEMPLATE_LIST' as const;
const UPDATE_TEMPLATE_LIST = 'template/UPDATE_TEMPLATE_LIST' as const;
const UPDATE_TEMPLATE_USER_LIST = 'template/UPDATE_TEMPLATE_USER_LIST' as const;
const UPDATE_SELECTED_ID = 'template/UPDATE_SELECTED_ID' as const;

export const createTemplate = () => ({
  type: CREATE_TEMPLATE,
});
export const setTemplateList = (payload: TemplateItem[]) => ({
  payload,
  type: SET_TEMPLATE_LIST,
});

interface UpdateSelectedId {
  templateId: string;
}
export const updateSelectedId = (payload: UpdateSelectedId) => ({
  payload,
  type: UPDATE_SELECTED_ID,
});
interface UpdateTemplateUserList {
  userList: UserItem[];
}
export const updateTemplateUserList = (payload: UpdateTemplateUserList) => ({
  payload,
  type: UPDATE_TEMPLATE_USER_LIST,
});

export const updateTemplateList = (payload: TemplateItem) => ({
  payload,
  type: UPDATE_TEMPLATE_LIST,
});
type TemplateAction =
  | ReturnType<typeof updateTemplateUserList>
  | ReturnType<typeof updateSelectedId>
  | ReturnType<typeof createTemplate>
  | ReturnType<typeof setTemplateList>
  | ReturnType<typeof updateTemplateList>;

type TemplateState = {
  selectedId: string;
  templateList: TemplateItem[];
};

const initialState: TemplateState = {
  selectedId: '',
  templateList: [],
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
    case UPDATE_SELECTED_ID:
      return { ...state, selectedId: action.payload.templateId };
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
    case UPDATE_TEMPLATE_LIST: {
      const targetIndex = state.templateList.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (targetIndex === -1) {
        return state;
      }

      Object.assign(state.templateList[targetIndex], action.payload);
      localStorage.setItem('templateList', JSON.stringify(state.templateList));
      return { ...state, templateList: state.templateList };
    }
    default:
      return state;
  }
}

export default template;
