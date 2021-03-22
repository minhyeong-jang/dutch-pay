import { PlusCircleOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import React, { FC } from 'react';
import styled from 'styled-components';

import { PaymentItem, UserItem } from '../../hooks';
import { SelectUser, SelectUserList } from '../User';

interface Props {
  userList: UserItem[];
  paymentList: PaymentItem[];
  addPayment(): void;
  updateTitle(value: string, index: number): void;
  updatePaymentPrice(value: string, index: number): void;
  updatePayerName(selectedUser: string, index: number): void;
  updateParticipants(participants: string[], index: number): void;
  // updatePayment(key: string, value: string, index: number): void;
}
export const PaymentTable: FC<Props> = ({
  paymentList,
  userList,
  addPayment,
  updateTitle,
  updatePaymentPrice,
  updatePayerName,
  updateParticipants,
  // updatePayment,
}) => {
  const columns = [
    {
      align: 'center' as const,
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: PaymentItem, index: number) =>
        record.status !== 'complete' ? (
          <StyledInput
            maxLength={15}
            placeholder="사용처"
            value={title}
            onChange={(e) => updateTitle(e.target.value, index)}
          />
        ) : (
          title
        ),
      sorter: true,
      title: '사용처',
      width: 150,
    },
    {
      align: 'center' as const,
      dataIndex: 'paymentPrice',
      render: (paymentPrice: number, record: PaymentItem, index: number) =>
        record.status !== 'complete' ? (
          <StyledInput
            value={paymentPrice.toLocaleString()}
            onChange={(e) => updatePaymentPrice(e.target.value, index)}
          />
        ) : (
          paymentPrice.toLocaleString()
        ),
      sorter: true,
      title: '지출 금액',
      width: 150,
    },
    {
      align: 'center' as const,
      dataIndex: 'payerName',
      key: 'payerName',
      render: (payerName: string, record: PaymentItem, index: number) =>
        record.status !== 'complete' ? (
          <SelectUser
            placeholder="결제자"
            userList={userList}
            value={payerName}
            onChange={(value) => updatePayerName(value, index)}
          />
        ) : (
          record.payerName
        ),
      sorter: true,
      title: '결제자',
      width: 150,
    },
    {
      align: 'center' as const,
      dataIndex: 'participants',
      key: 'participants',
      render: (participants: string[], record: PaymentItem, index: number) =>
        record.status !== 'complete' ? (
          <SelectUserList
            changeSelect={(participants) =>
              updateParticipants(participants, index)
            }
            mode="multiple"
            placeholder="참여자"
            userList={userList}
            value={participants}
          />
        ) : (
          record.paymentPrice.toLocaleString()
        ),
      title: '참여자',
    },
    {
      align: 'center' as const,
      key: 'action',
      render: () => (
        <>
          <StyledButton>저장</StyledButton>
          <StyledButton>수정</StyledButton>
        </>
      ),
      title: '',
      width: 150,
    },
  ];

  const Footer = () => (
    <StyledFooter onClick={addPayment}>
      <PlusCircleOutlined /> 항목 추가
    </StyledFooter>
  );

  return (
    <StyledContainer>
      <Table
        columns={columns}
        dataSource={paymentList}
        footer={Footer}
        rowKey={(record) => record.key}
      />
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  table {
    table-layout: fixed;
  }
  .ant-table-footer {
    padding: 0;
  }
`;
const StyledFooter = styled.button`
  width: 100%;
  padding: 15px;
  text-align: center;
  user-select: none;
  cursor: pointer;
  &:active,
  &:hover {
    opacity: 0.8;
  }
`;
const StyledInput = styled.input`
  background: white;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  padding: 5px 10px;
  border-radius: 5px;
  width: 100%;
`;
const StyledButton = styled.button`
  padding: 5px 10px;
`;
