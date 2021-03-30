// import { CustomTagProps } from 'rc-select/lib/interface/generator';

import { UserItem } from '../types';

/**
 * 유저 리스트에서 유저 이름으로 태그 컬러값을 리턴합니다.
 * @param userList
 * @param userName
 * @returns color, null
 */
export const getTagColor = (userList: UserItem[], userName: string) => {
  const filteredUser = userList.filter((user) => user.userName === userName);
  if (filteredUser.length) {
    return filteredUser[0].tagColor;
  }
  return '';
};
