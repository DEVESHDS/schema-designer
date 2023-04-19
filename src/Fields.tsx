import { IFields } from "./schema";
import { Field } from "./Field";

export function Fields({ fields, onDelete, onAdd, onChangeRequired }: Props) {
  return (
    <div
      className={
        fields && Object.keys(fields).length > 1
          ? "fields"
          : "fields no-bracket"
      }
    >
      {fields &&
        fields.map((field, i) => {
          return (
            <Field
              field={field}
              required={field.required}
              onDelete={onDelete}
              key={field.id}
              onAdd={onAdd}
              onChangeRequired={onChangeRequired}
              enableTypeChange={
                field.fields && Object.keys(field.fields).length > 0
                  ? true
                  : false
              }
            >
              <Fields
                fields={field.fields}
                onChangeRequired={onChangeRequired}
                onDelete={onDelete}
                onAdd={onAdd}
              />
            </Field>
          );
        })}
    </div>
  );
}

type Props = {
  name?: string;
  fields?: IFields;
  onDelete: (id: string) => void;
  onAdd: (id: string) => void;
  onChangeRequired: (
    id: string,
    arg: number,
    req: boolean | undefined,
    type: string
  ) => void;
};
