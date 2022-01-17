export const deleteRole = {
  delete: {
    summary: "Delete a role",
    description: "To delete a role only for super admin",
    tags: ["Role"],
    operationId: "roleId",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "roleId",
        in: "path",
        description: "ID of role to return",
        required: true,
        type: "string",
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
