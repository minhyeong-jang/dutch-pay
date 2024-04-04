import { message } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../../../redux';
import { updateTemplateList } from '../../../redux/template';
import { TemplateHeader } from '../components/Template';

interface Props {
  templateName: string;
}
export const TemplateContainer: FC<Props> = ({ templateName }) => {
  const navigation = useNavigate();
  const template = useSelector((state: RootState) => state.template);
  const dispatch = useDispatch();
  const [editTemplateName, setEditTemplateName] = useState(templateName);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    onCancel();
  }, [templateName, template.selectedId]);

  const onCancel = () => {
    setEditTemplateName(templateName);
    setIsEdit(false);
  };
  const onDelete = () => {
    if (template.templateList.length < 2) {
      message.error('템플릿은 최소 하나가 있어야해요. :(');
      return;
    }
    const items = [...template.templateList].filter(
      (item) => item.id !== template.selectedId,
    );
    dispatch(updateTemplateList({ templateList: items }));
    navigation(`/calc/${items[items.length - 1].id}`);
  };
  const onSave = () => {
    const items = [...template.templateList].map((item) =>
      item.id === template.selectedId
        ? {
            ...item,
            templateName: editTemplateName,
          }
        : item,
    );
    dispatch(updateTemplateList({ templateList: items }));
    setIsEdit(false);
  };
  return (
    <TemplateHeader
      editTemplateName={editTemplateName}
      isEdit={isEdit}
      setEditTemplateName={setEditTemplateName}
      setIsEdit={setIsEdit}
      templateName={templateName}
      onCancel={onCancel}
      onDelete={onDelete}
      onSave={onSave}
    />
  );
};
