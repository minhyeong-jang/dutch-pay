import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { RootState } from '../../../redux';
import { updateTemplateList } from '../../../redux/template';
import { TemplateHeader } from '../components/Template';

interface Props {
  templateName: string;
}
export const TemplateContainer: FC<Props> = ({ templateName }) => {
  const history = useHistory();
  const template = useSelector((state: RootState) => state.template);
  const dispatch = useDispatch();
  const [editTemplateName, setEditTemplateName] = useState(templateName);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setEditTemplateName(templateName);
    setIsEdit(false);
  }, [templateName]);

  const onDelete = () => {
    const items = [...template.templateList].filter(
      (item) => item.id !== template.selectedId,
    );
    dispatch(updateTemplateList({ templateList: items }));
    history.push('/');
  };
  const onSave = () => {
    const items = [...template.templateList];
    const selectedTemplate = items.findIndex(
      (item) => item.id === template.selectedId,
    );
    if (selectedTemplate !== -1) {
      items[selectedTemplate].templateName = editTemplateName;
      dispatch(updateTemplateList({ templateList: items }));
      setIsEdit(false);
    }
  };
  return (
    <TemplateHeader
      editTemplateName={editTemplateName}
      isEdit={isEdit}
      setEditTemplateName={setEditTemplateName}
      setIsEdit={setIsEdit}
      templateName={templateName}
      onDelete={onDelete}
      onSave={onSave}
    />
  );
};
