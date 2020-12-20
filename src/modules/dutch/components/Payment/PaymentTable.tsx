import { Space, Table, Tag } from "antd";
import React, { FC } from "react";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { PaymentItem } from "../../hooks";

interface Props {
  paymentList: PaymentItem[];
  addPayment(): void;
}
export const PaymentTable: FC<Props> = ({ paymentList, addPayment }) => {
  const columns = [
    {
      title: "결제 항목",
      dataIndex: "title",
      align: "center" as const,
      width: 200,
      render: (record: PaymentItem) =>
        record.status !== "complete" ? (
          <StyledInput value={record.title} onChange={(e) => {}} />
        ) : (
          record.title
        ),
    },
    {
      title: "지출 금액",
      dataIndex: "paymentPrice",
      key: "paymentPrice",
      render: (paymentPrice: number) => paymentPrice.toLocaleString(),
    },
    {
      title: "결제자",
      dataIndex: "payerName",
      key: "payerName",
    },
    {
      title: "참여자",
      dataIndex: "participants",
      key: "participants",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Space size='middle'>
          <a>Invite {record.payerName}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const Footer = () => (
    <StyledFooter onClick={addPayment}>
      <PlusCircleOutlined /> 항목 추가
    </StyledFooter>
  );

  return (
    <StyledContainer>
      <Table columns={columns} footer={Footer} dataSource={paymentList} />
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
