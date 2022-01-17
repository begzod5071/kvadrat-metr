export const developer = {
  get: {
    summary: "Get a developer",
    description: "To get one developers",
    tags: ["Developer"],
    operationId: "developerId",
    parameters: [
      {
        name: "id",
        in: "params",
        description: "the id that needs to get a developer",
        required: true,
      },
    ],
    responses: {
      200: {
        description: "A successful response",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Developer",
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
