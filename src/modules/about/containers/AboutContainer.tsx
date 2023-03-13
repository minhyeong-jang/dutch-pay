import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';

import { ContentHeader, ContentWrap } from '../../shared/components/Content';

const markdown = `
# 우리 더치페이 하자!

간단한 술자리부터 여행까지! 모임을 편하게 정산해 봅시다~

여러분들은 아래 사항 중 하나라도 겪으셨나요??

> "나중에 계산하기 복잡해! \`한 명이 다 계산하자.\`"  
> "1차하고 2차 \`참여한 사람 다르니까\` 따로따로 보내줘!"  
> "카드 안 챙겨서 둘리가 내꺼 결제해 줬는데, \`별도로 반영해 줄 수 있어?\`"  
> "길동이는 \`둘리한테 2,000원\` 보내고, 둘리는 \`또치 2,000원 / 도우너 3,000원\` 보내고..."  

이 외에도 다양하겠지만, 재미있게 놀고 왔는데 머리 아프다니.. 너무 슬프지 않나요?  

그렇다면 여기서 한번 해보세요!  
\`빠르고 쉽게 정산\`하고 \`송금하는 사람도 편하도록\` 모든 정산 방법을 넣었습니다.

아직도 \`"내가 원하는 기능이 없어!"\`라고 생각하면, [Contact](https://minhyeong-jang.github.io/contact)로 문의해 주세요. 확인 후 추가해드릴게요!

## 사용방법

**1. 참가자 입력**

- 참가자를 입력해 주세요.

**2. 결제정보 입력**

- 사용처, 금액을 입력해 주세요.
- 결제자, 참가자를 선택해 주세요.
- 나눠서 결제 한 경우, 항목을 추가해서 결제 정보를 결제한 만큼 입력해 주세요.
- 사용처, 금액, 결제자, 참가자 중 하나라도 정보가 없다면 정산 리스트에 포함되지 않습니다.

**3. 정산결과 확인**

- 참가자의 결제/송금 금액이 출력되며, 각 참가자 정보에는 송금해야 하는 리스트가 출력됩니다.
- 한 명이 송금 받아서 정산하는 방식으로 전송해도 무관합니다.

## Developer

- Author : [Minhyeong Jang](https://minhyeong-jang.github.io/about)  
- Email : [public.doriri@gmail.com](mailto:public.doriri@gmail.com)

## Release Note
- May 22, 2021
  - 정산 탭 추가 및 UI 개선
  - URL 접근 오류 수정
  - 기타 버그 수정
- March 30, 2021
  - 템플릿 저장/수정/삭제 추가
  - 참여자 삭제 오류 수정
  - UI 개선
  - 기타 버그 수정
- March 27, 2021
  - 템플릿 리스트 적용
- March 26, 2021
  - 로컬스토리지 저장 기능 추가
- March 25, 2021
  - 단순 정보 확인이 가능하도록 수정, UI 개편
`;

export const AboutContainer: FC = () => {
  return (
    <>
      <ContentHeader>Hello Dutch Pay</ContentHeader>
      <ContentWrap>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </ContentWrap>
    </>
  );
};
