import "./styles.css";
import { schema as _schema, ISchema, IFields, FieldTypes } from "./schema";
import { FunctionComponent, useState } from "react";
import { Fields } from "./Fields";
import { Field } from "./Field";

const App: FunctionComponent = () => {
  const [schema, setSchema] = useState<ISchema>(_schema);

  //function for adding at top
  const onAddTop = () => {
    const schemaCopy = JSON.parse(JSON.stringify(schema)) as ISchema;
    if (!schemaCopy.fields) schemaCopy.fields = [];

    schemaCopy.fields.push({
      id: guidGenerator(),
      name: `addName`,
      type: "string",
    });
    setSchema(schemaCopy);
  };

  // Example id: `Person.name.firstName`
  const onAdd = (id: string) => {
    const schemaCopy = JSON.parse(JSON.stringify(schema));

    const findAndAdd = (id: string, fields: IFields) => {
      const field = fields.find((f) => f.id === id);

      if (field) {
        if (!field.fields) field.fields = [];

        field.fields.push({
          id: guidGenerator(),
          name: `addName`,
          type: "string",
        });

        return true;
      } else {
        for (const field of fields) {
          if (field.fields) {
            if (findAndAdd(id, field.fields)) return true;
          }
        }
      }

      return false;
    };

    if (findAndAdd(id, schemaCopy.fields)) {
      setSchema(schemaCopy);
    } else {
      throw new Error(`Could not find ${id}`);
    }
  };

  // Example id: `Person.name.firstName`
  const onDelete = (id: string) => {
    const schemaCopy = JSON.parse(JSON.stringify(schema));

    const findAndDelete = (id: string, fields: IFields) => {
      const field = fields.find((f) => f.id === id);

      if (field) {
        const fieldIndex = fields.findIndex((f) => f.id == id);
        fields.splice(fieldIndex, 1);
        return true;
      } else {
        for (const field of fields) {
          if (field.fields) {
            if (findAndDelete(id, field.fields)) return true;
          }
        }
      }

      return false;
    };

    if (findAndDelete(id, schemaCopy.fields)) {
      setSchema(schemaCopy);
    } else {
      throw new Error(`Could not find ${id}`);
    }
  };

  const onChangeRequired = (
    id: string,
    arg: number,
    req: boolean | undefined,
    name: string
  ) => {
    const schemaCopy = JSON.parse(JSON.stringify(schema));

    const findAndChangeRequired = (id: string, fields: IFields) => {
      const field = fields.find((f) => f.id === id);

      if (field) {
        if (arg === 1) {
          //for changing required field
          field.required = req;
        } else if (arg === 2) {
          //for changing property type field
          field.type = name as FieldTypes;
        } else if (arg === 3) {
          // for changing name
          field.name = name;
        }

        return true;
      } else {
        for (const field of fields) {
          if (field.fields) {
            if (findAndChangeRequired(id, field.fields)) return true;
          }
        }
      }

      return false;
    };

    if (findAndChangeRequired(id, schemaCopy.fields)) {
      setSchema(schemaCopy);
    } else {
      throw new Error(`Could not find ${id}`);
    }
  };

  return (
    <div className="App">
      <div className="schema">
        <button
          className="app-top-add-button"
          onClick={() => {
            onAddTop();
          }}
        >
          +
        </button>
        <ol>
          {schema.fields.map((field, i) => {
            return (
              <li key={field.id}>
                <Field
                  field={field}
                  required={field.required}
                  onDelete={onDelete}
                  onAdd={onAdd}
                  onChangeRequired={onChangeRequired}
                  enableTypeChange={
                    field.fields && field.fields.length > 0 ? true : false
                  }
                >
                  <Fields
                    fields={field.fields}
                    onDelete={onDelete}
                    onAdd={onAdd}
                    onChangeRequired={onChangeRequired}
                  />
                </Field>
              </li>
            );
          })}
        </ol>
        <button
          className="app-top-add-button"
          onClick={() => {
            console.log("Schema is :", schema);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

export default App;
