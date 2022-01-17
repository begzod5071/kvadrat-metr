export const create = {
  post: {
    summary: "Add a new project",
    description: "To create new project only specific user",
    tags: ["Project"],
    operationId: "projectNew",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "body",
        in: "body",
        description: "the object that needs to create a new project",
        required: true,
        schema: {
          $ref: "#/components/schemas/NewProject",
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
