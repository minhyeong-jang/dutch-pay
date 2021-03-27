import { Dispatch, useState } from 'react';

export interface UserItem {
  userName: string;
  tagColor: string;
}
export interface AddUser {
  userName: string;
  tagColor: string;
}
interface Props {
  templateId: string;
  dispatch: Dispatch<any>;
}
export const useUserList = ({ templateId, dispatch }: Props) => {
  const [userList, setUserList] = useState<UserItem[]>([]);

  const addUser = ({ userName, tagColor }: AddUser) => {
    setUserList((prevState) => [
      ...prevState,
      {
        tagColor,
        userName,
      },
    ]);
  };

  const removeUser = (userName: string) => {
    const filterList = userList.filter((user) => user.userName !== userName);
    setUserList(filterList);
  };

  return {
    addUser,
    removeUser,
    setUserList,
    userList,
  };
};
