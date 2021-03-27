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
          <NavLink activeClassName="active" to={`/calc/${template.id}`} exact>
            {template.templateName}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
