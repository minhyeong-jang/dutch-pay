import { TemplateItem } from '../types';
import { generateTemplate } from '../utils/template';

const INSERT = 'template/INSERT' as const;

export const insert = () => ({
  type: INSERT,
});

// export const increaseBy = (diff: number) => ({
//   payload: diff,

//   type: INCREASE_BY,
// });

type TemplateAction = ReturnType<typeof insert>;
type TemplateState = {
  templates: TemplateItem[];
};

const initialState: TemplateState = {
  templates: [],
};

function template(
  state: TemplateState = initialState,
  action: TemplateAction,
): TemplateState {
  switch (action.type) {
    case INSERT:
      return { templates: [...state.templates, generateTemplate()] };
    // case DECREASE:
    //   return { count: state.count - 1 };
    // case INCREASE_BY:
    //   return { count: state.count + action.payload };
    default:
      return state;
  }
}

export default template;
