import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';

import { ContentHeader, ContentWrap } from '../../shared/components/Content';
import AboutMd from '../components/about.md';

export const AboutContainer: FC = () => {
  return (
    <>
      <ContentHeader>Hello Dutch Pay</ContentHeader>
      <ContentWrap>
        <h1>더치페이</h1>
        <p>
          여러분들은 간단한 술자리부터 여행처럼 지인과의 모임 후 정산을 하기
          위해 오셨을 겁니다.
          <br /> 총무는 사용된 비용을 정산하는데, 회비 형태가 아니라면 시간도
          소요되고 여러 사람들이 각자 결제하면 더 복잡해집니다.
        </p>
        <p>
          열심히 찾은 더치페이 앱들은 단순하게 금액을 인원 수로 나누거나,
          <br />
          조금 더 발전해서 결제자/참여자를 선택하지만, 복잡하게 여러번
          송금해야하는 정보가 노출됩니다.
        </p>
        <p>그렇게 제가 불편함을 느끼고 더치페이 홈페이지를 만들었습니다.</p>
        <p>
          정산을 누구보다 빠르고 쉽게하고 송금하는 사람도 귀찮지 않도록 모든
          정산 방법을 넣었습니다.
        </p>
        <h2>Guide</h2>
        <p>
          <b>1. 참가자 입력</b>
        </p>
        <ul>
          <li>참가자를 입력해주세요.</li>
        </ul>
        <p>
          <b>2. 결제정보 입력</b>
        </p>
        <ul>
          <li>사용처, 금액를 입력해주세요.</li>
          <li>결제자, 참가자를 선택해주세요.</li>
          <li>
            만약 나눠서 결제 한 경우, 항목을 추가해서 결제 정보를 결제한 만큼
            입력해주세요.
          </li>
          <li>
            사용처, 금액, 결제자, 참가자 중 하나라도 정보가 없다면 정산 리스트에
            포함되지 않습니다.
          </li>
        </ul>
        <p>
          <b>3. 송금정보 확인</b>
        </p>
        <ul>
          <li>
            상단 총 금액 / 인원 수는 평균 금액입니다. 각자 사용한 금액이
            아닙니다.
          </li>
          <li>
            참가자의 결제/송금 금액이 출력되며, 참가자 정보 아래 송금해야하는
            리스트가 출력됩니다.
          </li>
          <li>한 명이 송금받아서 정산하는 방식을 선택합니다.</li>
        </ul>
        <h2>제작자</h2>
        <p>Minhyeong Jang</p>
        <p>문의사항 : public.doriri@gmail.com</p>
        <h2>Release Note</h2>
        <ul>
          <li>
            <span>March 25, 2021</span>
          </li>
        </ul>
      </ContentWrap>
    </>
  );
};
