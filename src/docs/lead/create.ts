export const create = {
  post: {
    summary: "Add a new lead",
    description: "To create new lead",
    tags: ["Lead"],
    operationId: "leadNew",
    parameters: [
      {
        name: "body",
        in: "body",
        description: "the object that needs to create a new lead",
        required: true,
        schema: {
          $ref: "#/components/schemas/NewLead",
        },
      },
    ],
    responses: {
      201: {
        description: "A successful response",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Success",
            },
          },
        },
      },
      400: {
        description: "Not allowed",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
      },
      500: {
        description: "Server Error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
      },
    },
  },
};
