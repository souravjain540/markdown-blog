import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const ArticleCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Content" multiline source="content" />
        <TextInput
          label="Short Description"
          multiline
          source="shortDescription"
        />
        <TextInput label="Title" source="title" />
      </SimpleForm>
    </Create>
  );
};
