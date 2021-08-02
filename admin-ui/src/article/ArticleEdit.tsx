import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const ArticleEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Content" multiline source="content" />
        <TextInput
          label="Short Description"
          multiline
          source="shortDescription"
        />
        <TextInput label="Title" source="title" />
      </SimpleForm>
    </Edit>
  );
};
