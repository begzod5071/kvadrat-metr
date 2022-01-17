export const signup = {
  post: {
    summary: "create a new user",
    description: "To create a new user only for super admin",
    tags: ["User"],
    operationId: "user",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "body",
        in: "body",
        description: "User object that needs to be added to the store",
        required: true,
        schema: {
          $ref: "#/components/schemas/User",
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
