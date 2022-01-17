export const update = {
  put: {
    summary: "Update a new developer",
    description: "To update new developer only specific user",
    tags: ["Project"],
    operationId: "projectUp",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "id",
        in: "params",
        description: "the id that needs to update a developer",
        required: true,
      },
      {
        name: "body",
        in: "body",
        description:
          "the object that needs to update a developer and it is optional",
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
