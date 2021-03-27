import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../../redux';
import { usePaymentList, useUserList } from '../hooks';
import { CalculateContainer } from './CalculateContainer';
import { PaymentListContainer } from './PaymentListContainer';
import { TemplateContainer } from './TemplateContainer';
import { UserListContainer } from './UserListContainer';

interface Props {
  templateId: string;
}
export const DutchContainer: FC<Props> = ({ templateId }) => {
  const template = useSelector((state: RootState) => state.template);
  const { userList, addUser, removeUser, setUserList } = useUserList();
  const {
    paymentList,
    addPayment,
    updateParticipants,
    updatePayerName,
    updatePaymentPrice,
    updateTitle,
    setPaymentList,
  } = usePaymentList();

  useEffect(() => {
    const filterTemplate = template.templateList.filter(
      (item) => item.id === templateId,
    );
    if (filterTemplate.length) {
      setPaymentList(filterTemplate[0].paymentList);
      setUserList(filterTemplate[0].userList);
    }
  }, [templateId]);

  useEffect(() => {
    // const templateList: TemplateItem[] = [
    //   {
    //     paymentList,
    //     templateName: 'Template 5',
    //     userList,
    //   },
    // ];
    // localStorage.setItem('templateList', JSON.stringify(templateList));
  }, [userList, paymentList]);

  return (
    <StyledContainer>
      <TemplateContainer />
      <UserListContainer
        addUser={addUser}
        removeUser={removeUser}
        userList={userList}
      />
      <PaymentListContainer
        addPayment={addPayment}
        paymentList={paymentList}
        updateParticipants={updateParticipants}
        updatePayerName={updatePayerName}
        updatePaymentPrice={updatePaymentPrice}
        updateTitle={updateTitle}
        userList={userList}
      />
      <CalculateContainer paymentList={paymentList} userList={userList} />
    </StyledContainer>
  );
};
const StyledContainer = styled.div``;
