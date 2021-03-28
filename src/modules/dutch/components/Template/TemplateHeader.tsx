import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { message } from 'antd';
import React, { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

import { ContentHeader } from '../../../shared/components/Content';

interface Props {
  templateName: string;
  editTemplateName: string;
  isEdit: boolean;
  setEditTemplateName(value: string): void;
  setIsEdit(value: boolean): void;
  onSave(): void;
  onDelete(): void;
}
export const TemplateHeader: FC<Props> = ({
  templateName,
  editTemplateName,
  isEdit,
  setEditTemplateName,
  setIsEdit,
  onSave,
  onDelete,
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 15) {
      message.error('템플릿 이름은 최대 15자 입니다.');
    } else {
      setEditTemplateName(value);
    }
  };
  return (
    <StyledContainer>
      {isEdit ? (
        <StyledInput
          maxLength={20}
          placeholder="템플릿 이름 최대 20자"
          value={editTemplateName}
          onChange={onChange}
        />
      ) : (
        <ContentHeader>{templateName}</ContentHeader>
      )}
      <StyledIconWrap>
        {isEdit ? (
          <>
            <CheckOutlined onClick={() => onSave()} />
            <CloseOutlined onClick={() => setIsEdit(false)} />
            <DeleteOutlined onClick={() => onDelete()} />
          </>
        ) : (
          <EditOutlined onClick={() => setIsEdit(true)} />
        )}
      </StyledIconWrap>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const StyledInput = styled.input`
  width: 150px;
  font-size: 16px;
  border: 1px solid #dedede;
  border-radius: 4px;
  padding: 8px 10px;
  margin-bottom: 14px;
  font-weight: bold;
`;
const StyledIconWrap = styled.div`
  margin: 11px 0 0 10px;

  svg {
    font-size: 18px;
    margin-right: 7px;
  }
`;
