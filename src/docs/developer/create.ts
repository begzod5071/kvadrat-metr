export const create = {
  post: {
    summary: "Add a new developer",
    description: "To create new developer only specific user",
    tags: ["Developer"],
    operationId: "developerNew",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "body",
        in: "body",
        description: "the object that needs to create a new developer",
        required: true,
        schema: {
          $ref: "#/components/schemas/NewDeveloper",
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
