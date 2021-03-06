export const create = {
  post: {
    summary: "Add a new role",
    description: "To create new role only for super admin",
    tags: ["Role"],
    operationId: "role",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "body",
        in: "body",
        description: "Hello",
        required: true,
        schema: {
          $ref: "#/components/schemas/Role",
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
