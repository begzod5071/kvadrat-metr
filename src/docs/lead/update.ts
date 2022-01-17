export const update = {
  put: {
    summary: "Update a lead",
    description: "To update  lead only specific user",
    tags: ["Lead"],
    operationId: "leadUp",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "id",
        in: "params",
        description: "the id that needs to update a lead",
        required: true,
      },
      {
        name: "body",
        in: "body",
        description:
          "the object that needs to update a lead and it is optional",
        required: true,
        schema: {
          $ref: "#/components/schemas/NewLead",
        },
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
