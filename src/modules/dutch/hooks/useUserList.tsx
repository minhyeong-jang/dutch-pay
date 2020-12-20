import { useState } from "react";

export interface UserItem {
  userName: string;
  tagColor: string;
}
export interface AddUser {
  userName: string;
  tagColor: string;
}

export const useUserList = () => {
  const [userList, setUserList] = useState<UserItem[]>([]);

  const addUser = ({ userName, tagColor }: AddUser) => {
    setUserList((prevState) => [
      ...prevState,
      {
        userName,
        tagColor,
      },
    ]);
  };

  const removeUser = (userName: string) => {
    const filterList = userList.filter((user) => user.userName !== userName);
    setUserList(filterList);
  };

  return {
    userList,
    addUser,
    removeUser,
  };
};
