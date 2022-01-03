import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { RootState } from '../../../redux';

export const RootPage: FC = () => {
  const navigation = useNavigate();
  const template = useSelector((state: RootState) => state.template);

  useEffect(() => {
    navigation(
      `/calc/${
        template.templateList.length ? template.templateList[0].id : 'null'
      }`,
      {
        replace: true,
      },
    );
  }, [template, navigation]);

  return <div>Redirect</div>;
};
