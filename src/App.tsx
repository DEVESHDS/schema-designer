import "./styles.css";
import { schema as _schema, ISchema, IField, IFields, FieldTypes } from "./schema";
import { FunctionComponent, useState } from "react";
import { Fields } from "./Fields";
import { Field } from "./Field";



 const  App:FunctionComponent=()=> {
  const [schema, setSchema] = useState<ISchema>(_schema);


  //function for adding at top

  const onAddTop=()=>{
    const schemaCopy = JSON.parse(JSON.stringify(schema));
    schemaCopy.fields={...schemaCopy.fields,addName: { type: "string" }}
    setSchema(schemaCopy);
  }

  // Example id: `Person.name.firstName`
  const onAdd = (id: string) => {
    const schemaCopy = JSON.parse(JSON.stringify(schema));

    const findAndAdd = (id: string, fields: IFields) => {
      const [firstId, secondId, ...rest] = id.split(".");

      if (secondId && secondId !== "") {
        if (fields[firstId].fields === undefined)
          throw new Error(`Cannot found ${id}`);

        findAndAdd([secondId, ...rest].join("."), fields[firstId].fields ?? {});
      } else {
        fields[firstId].fields = {
          ...{ addName: { type: "string" } },
          ...fields[firstId].fields
        };
      }
    };

    findAndAdd(id, schemaCopy.fields);
    setSchema(schemaCopy);
  };

  // Example id: `Person.name.firstName`
  const onDelete = (id: string) => {
    const schemaCopy = JSON.parse(JSON.stringify(schema));

    const findAndDelete = (id: string, fields: IFields) => {
      const [firstId, secondId, ...rest] = id.split(".");

      if (secondId && secondId !== "") {
        if (fields[firstId].fields === undefined)
          throw new Error(`Cannot found ${id}`);

        findAndDelete(
          [secondId, ...rest].join("."),
          fields[firstId].fields ?? {}
        );
      } else {
        delete fields[firstId];
      }
    };

    findAndDelete(id, schemaCopy.fields);

    setSchema(schemaCopy);
  };

  const onChangeRequired = (id: string,arg:number, req: boolean|undefined,name:string) => {
    
    const schemaCopy = JSON.parse(JSON.stringify(schema));

    const findAndChangeRequired = (id: string, fields: IFields) => {
      const [firstId, secondId, ...rest] = id.split(".");

      if (secondId && secondId !== "") {
        if (fields[firstId].fields === undefined)
          throw new Error(`Cannot found ${id}`);

        findAndChangeRequired(
          [secondId, ...rest].join("."),
          fields[firstId].fields ?? {}
        );
      } else {
        if(arg===1){
          //for changing required field
          fields[firstId].required=req
        }else if(arg===2){
          //for changing property type field
          fields[firstId].type=name as FieldTypes;
        }else if(arg===3){
          fields[name]=fields[firstId];
          delete fields[firstId];

        }
        
        
      }
    };
    findAndChangeRequired(id, schemaCopy.fields);
    setSchema(schemaCopy);
  };

  const findFieldHelper=(id: string, fields: IFields)=>{
    const [firstId, secondId, ...rest] = id.split(".");

      if (secondId && secondId !== "") {
        if (fields[firstId].fields === undefined){
          return null;
        }
          

        findFieldHelper(
          [secondId, ...rest].join("."),
          fields[firstId].fields ?? {}
        );
      } else {
        return fields;
        
        
      }
  }

  const onChangePropertyName=(id:string,oldProperty:string,newProperty:string)=>{
    const schemaCopy = JSON.parse(JSON.stringify(schema));
   

    const findAndDelete = (id: string, fields: IFields) => {
      const [firstId, secondId, ...rest] = id.split(".");

      if (secondId && secondId !== "") {
        if (fields[firstId].fields === undefined)
          throw new Error(`Cannot found ${id}`);

        findAndDelete(
          [secondId, ...rest].join("."),
          fields[firstId].fields ?? {}
        );
      } else {
        delete fields[firstId];
      }
    };

    findAndDelete(id, schemaCopy.fields);

    setSchema(schemaCopy);
  }

  return (
    <div className="App">
      <button className="app-top-add-button" onClick={()=>{
     
        onAddTop()
      }}>+</button>
      <ol>
        {Object.entries(schema.fields).map(([name, field], i) => {
          return (
            <li key={name}>
              <Field
                name={name}
                type={field.type}
                required={field.required}
                onDelete={onDelete}
                onAdd={onAdd}
                onChangeRequired={onChangeRequired}
               
                enableTypeChange={field.fields && Object.keys(field.fields).length > 0 ?true:false}
              >
                {field.fields ? (
                  <Fields
                    fields={field.fields}
                    onDelete={(id) => onDelete(`${name}.${id}`)}
                    onAdd={(id) => onAdd(`${name}.${id}`)}
                    onChangeRequired={(id,arg, req,type) =>
                      onChangeRequired(`${name}.${id}`,arg, req,type)
                    }
                    
                  />
                ) : (
                  <></>
                )}
              </Field>
            </li>
          );
        })}
      </ol>
      <button className="app-top-add-button" onClick={()=>{
        console.log("Schema is :",schema);
      }}>Save</button>
    </div>
  );
}

export default App;
