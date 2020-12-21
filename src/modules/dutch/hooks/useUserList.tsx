import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const localUserList = localStorage.getItem('userList');
    if (localUserList) {
      setUserList(JSON.parse(localUserList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userList', JSON.stringify(userList));
  }, [userList]);

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
    userList,
  };
};
