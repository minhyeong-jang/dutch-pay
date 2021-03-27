import { TemplateItem } from '../types';
import { generateTemplate } from '../utils/template';

const CREATE_TEMPLATE = 'template/CREATE_TEMPLATE' as const;
const SET_TEMPLATE_LIST = 'template/SET_TEMPLATE_LIST';

export const createTemplate = () => ({
  type: CREATE_TEMPLATE,
});
export const setTemplateList = (templateList: TemplateItem[]) => ({
  payload: templateList,
  type: SET_TEMPLATE_LIST,
});

type TemplateAction =
  | ReturnType<typeof createTemplate>
  | ReturnType<typeof setTemplateList>;

type TemplateState = {
  templateList: TemplateItem[];
};

const initialState: TemplateState = {
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
      return { templateList: attachTemplateList };
    }
    case SET_TEMPLATE_LIST:
      return { templateList: action.payload };
    // case INCREASE_BY:
    //   return { count: state.count + action.payload };
    default:
      return state;
  }
}

export default template;
