import { Tabs } from 'antd';
import React, { FC } from 'react';

const { TabPane } = Tabs;

import styled from 'styled-components';

import {
  CalculateGetPriceItem,
  CalculateItem,
  UserItem,
} from '../../../../types';
import { ManagerSendTab } from './ManagerSendTab';
import { PersonalSendTab } from './PersonalSendTab';

interface Props {
  userList: UserItem[];
  calculateList: CalculateItem;
  calculateGetPriceList: CalculateGetPriceItem;
}
export const CalculateTabList: FC<Props> = ({
  userList,
  calculateList,
  calculateGetPriceList,
}) => {
  return (
    <StyledContainer>
      <StyledTabs defaultActiveKey="1">
        <TabPane key="1" tab="일괄 송금">
          <ManagerSendTab
            calculateGetPriceList={calculateGetPriceList}
            calculateList={calculateList}
            userList={userList}
          />
        </TabPane>
        <TabPane key="2" tab="각자 송금">
          <PersonalSendTab calculateList={calculateList} />
        </TabPane>
      </StyledTabs>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  margin: 20px 0px;
`;
const StyledTabs = styled(Tabs)`
  .ant-tabs-nav-wrap {
    justify-content: center;

    .ant-tabs-ink-bar {
      background: ${({ theme }) => theme.color.point} !important;
    }
  }
  .ant-tabs-tab {
    font-size: 17px;

    &.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: ${({ theme }) => theme.color.point} !important;
      font-weight: bold;
    }
  }
`;
