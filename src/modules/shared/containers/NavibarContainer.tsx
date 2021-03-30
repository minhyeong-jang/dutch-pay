import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../redux';
import { createTemplate, setTemplateList } from '../../../redux/template';
import { TemplateItem } from '../../../types';
import { Navibar } from '../components/Navibar';

export const NavibarContainer: FC = () => {
  const template = useSelector((state: RootState) => state.template);
  const dispatch = useDispatch();

  useEffect(() => {
    const storageTemplate = localStorage.getItem('templateList');
    if (storageTemplate) {
      const storageTemplateList = JSON.parse(storageTemplate) as TemplateItem[];
      dispatch(setTemplateList(storageTemplateList));
    } else {
      addTemplate();
    }
  }, []);

  const addTemplate = () => {
    dispatch(createTemplate());
  };

  return (
    <Navibar templateList={template.templateList} onAddTemplate={addTemplate} />
  );
};
