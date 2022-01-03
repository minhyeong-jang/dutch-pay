import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { TemplateItem } from '../../../../types';

interface Props {
  templateList: TemplateItem[];
}
export const TemplateList: FC<Props> = ({ templateList }) => {
  return (
    <ul>
      {templateList.map((template, index) => (
        <li key={index}>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to={`/calc/${template.id}`}
          >
            {template.templateName}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
