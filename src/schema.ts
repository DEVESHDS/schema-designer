export type FieldTypes = "object" | "string" | "integer" | "boolean";

export type IField = {
  type: FieldTypes;
  required?: boolean;
  fields?: IFields;
};

export type IFields = Record<string, IField>;

export type ISchema = {
  fields: IFields;
};

export const schema: ISchema = {
  fields: {
    Person: {
      type: "object",
      required: true,
      fields: {
        name: {
          type: "object",
          required: false,
          fields: {
            firstName: {
              type: "string",
              required: true
            },
            lastName: {
              type: "string",
              required: true
            }
          }
        },
        age: {
          type: "integer"
        }
      }
    },
    order: {
      type: "string",
      required: false
    },
    class: {
      type: "boolean",
      required: false
    }
  }
};
