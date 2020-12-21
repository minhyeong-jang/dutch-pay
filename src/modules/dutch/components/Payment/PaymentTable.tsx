import { PlusCircleOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import React, { FC } from 'react';
import styled from 'styled-components';

import { PaymentItem } from '../../hooks';

interface Props {
  paymentList: PaymentItem[];
  addPayment(): void;
}
export const PaymentTable: FC<Props> = ({ paymentList, addPayment }) => {
  const columns = [
    {
      dataIndex: 'title',
      render: (record: PaymentItem) =>
        record.status !== 'complete' ? (
          <StyledInput value={record.title} onChange={() => {}} />
        ) : (
          record.title
        ),

      title: '결제 항목',
      width: 200,
    },
    {
      dataIndex: 'paymentPrice',
      render: (record: PaymentItem) =>
        record.status !== 'complete' ? (
          <StyledInput value={record.paymentPrice} onChange={() => {}} />
        ) : (
          record.paymentPrice.toLocaleString()
        ),

      title: '지출 금액',
      width: 150,
    },
    {
      dataIndex: 'payerName',
      key: 'payerName',
      title: '결제자',
    },
    {
      dataIndex: 'participants',
      key: 'participants',
      title: '참여자',
    },
    {
      key: 'action',
      render: () => (
        <></>
        // <Space size="middle">
        //   <a>Invite {record.payerName}</a>
        //   <a>Delete</a>
        // </Space>
      ),
      title: 'Action',
    },
  ];

  const Footer = () => (
    <StyledFooter onClick={addPayment}>
      <PlusCircleOutlined /> 항목 추가
    </StyledFooter>
  );

  return (
    <StyledContainer>
      <Table columns={columns} dataSource={paymentList} footer={Footer} />
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
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
`;
