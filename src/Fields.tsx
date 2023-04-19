import { IFields } from "./schema";
import { Field } from "./Field";

export function Fields({ fields, onDelete, onAdd,onChangeRequired }: Props) {
  return (
    <div
      className={
        fields && Object.keys(fields).length > 1
          ? "fields"
          : "fields no-bracket"
      }
    >
      {Object.entries(fields).map(([name, field], i) => {
        return (
          <>
            <Field
              name={name}
              type={field.type}
              required={field.required}
              onDelete={onDelete}
              key={name}
              onAdd={onAdd}
              onChangeRequired={onChangeRequired}
              enableTypeChange={field.fields && Object.keys(field.fields).length > 0 ?true:false}
            ></Field>
            {field.fields && Object.keys(field.fields).length > 0 ? (
              <Fields
                fields={field.fields}
                onChangeRequired={(id,arg,req,type)=>{onChangeRequired(`${name}.${id}`,arg,req,type)}}
                onDelete={(id) => onDelete(`${name}.${id}`)}
                onAdd={(id) => onAdd(`${name}.${id}`)}
               
              />
            ) : (
              <></>
            )}
          </>
        );
      })}
    </div>
  );
}

type Props = {
  name?: string;
  fields: IFields;
  // enableTypeChange:boolean,
  onDelete: (id: string) => void;
  onAdd: (id: string) => void;
  onChangeRequired: (id: string,arg:number, req: boolean|undefined,type:string) => void;
};
