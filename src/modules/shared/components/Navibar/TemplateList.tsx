import React, { FC } from 'react';
import styled from 'styled-components';

import { TemplateItem } from '../../types';

interface Props {
  templateList: TemplateItem[];
}
export const TemplateList: FC<Props> = ({ templateList }) => {
  return (
    <ul>
      {templateList.map((template, index) => (
        <li key={index}>
          <a href="#">{template.templateName}</a>
        </li>
      ))}
    </ul>
  );
};
