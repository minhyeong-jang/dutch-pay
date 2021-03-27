const breakpoint = [375, 414, 768, 960, 1280];
const mediaQuery = {
  /**
   * Large
   * \>= 960px
   * @example 데스크탑
   */
  lg: `@media screen and (min-width: ${breakpoint[3]})`,

  /**
   * Medium
   * \>= 768px
   * @example 태블릿
   */
  md: `@media screen and (min-width: ${breakpoint[2]})`,

  /**
   * Small
   * \>= 414px
   * @example 큰 모바일 기기, iPhone 8 Plus, iPhone 11 XS Max
   */
  sm: `@media screen and (min-width: ${breakpoint[1]})`,

  /**
   * Extra large
   * \>= 1280px
   * @example 고해상도 데스크탑
   */
  xl: `@media screen and (min-width: ${breakpoint[4]})`,

  /**
   * Extra small
   * \>= 375px
   * @example 일반 모바일 기기, iPhone X
   */
  xs: `@media screen and (min-width: ${breakpoint[0]})`,
  /* eslint-enable */
};

const color = {
  borderColor: '#d9d9d9',
  githubColor: '#252525',
  linkColor: '#c84b3a',
  point: '#5e22e8',
};
const layout = {
  borderRadius: '5px',
  section: `
    margin-bottom: 20px;
    border: 1px solid #d1cad8;
    padding: 20px;
    border-radius: 10px;
    background: white;
  `,
};

export const theme = {
  color,
  layout,
  mediaQuery,
};

export type Theme = typeof theme;

export default theme;
