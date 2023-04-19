export type FieldTypes = "object" | "string" | "integer" | "boolean";

export type IField = {
  name: string;
  type: FieldTypes;
  required?: boolean;
  fields?: IFields;
  id: string;
};

export type IFields = Array<IField>;

export type ISchema = {
  fields: IFields;
};

export const schema: ISchema = {
  fields: [
    {
      name: "Person",
      type: "object",
      required: true,
      fields: [
        {
          name: "name",
          type: "object",
          required: false,
          id: "aksdkla",
          fields: [
            {
              name: "firstName",
              type: "string",
              required: true,
              id: "ajsndas",
            },
            {
              name: "lastName",
              type: "string",
              required: true,
              id: "jani12nkn0",
            },
          ],
        },
        { name: "age", type: "integer", id: "jn12nk1np" },
      ],
      id: "x456b",
    },
    {
      name: "Person",
      type: "string",
      required: false,
      id: "zb329dj",
    },
    { name: "class", type: "boolean", required: false, id: "asdn9j2m" },
  ],
};
