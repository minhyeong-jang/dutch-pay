import 'styled-components';

import { CSSProp } from 'styled-components';

import { Theme } from './styles/theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

declare module 'react' {
  interface Attributes {
    css?: CSSProp<Theme>;
  }
}
