import React, { FC, useEffect, useState } from 'react';

import { Navibar } from '../components/Navibar';
import { TemplateItem } from '../types';

export const NavibarContainer: FC = () => {
  const [templateList, setTemplateList] = useState<TemplateItem[]>([]);

  useEffect(() => {
    const storageTemplate = localStorage.getItem('templateList');
    if (storageTemplate) {
      const storageTemplateList = JSON.parse(storageTemplate) as TemplateItem[];
      setTemplateList(storageTemplateList);
    }
  }, []);

  const addTemplate = () => {
    const storageTemplate = localStorage.getItem('templateList');
    if (!storageTemplate) return;

    const storageTemplateList = JSON.parse(storageTemplate) as TemplateItem[];

    const templateList: TemplateItem[] = [
      ...storageTemplateList,
      {
        paymentList: [],
        templateName: 'New Template',
        userList: [],
      },
    ];
    localStorage.setItem('templateList', JSON.stringify(templateList));
    setTemplateList(templateList);
  };

  return <Navibar templateList={templateList} onAddTemplate={addTemplate} />;
};
