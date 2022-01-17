export const deleteDev = {
  delete: {
    summary: "delete a developer",
    description: "To delete a developer only specific user",
    tags: ["Developer"],
    operationId: "developerDel",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "id",
        in: "params",
        description: "the id that needs to delete a developer",
        required: true,
      },
    ],
    responses: {
      200: {
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
