export const apartment = {
  get: {
    summary: "Get a apartment",
    description: "To get one apartment",
    tags: ["Apartment"],
    operationId: "apartmentId",
    parameters: [
      {
        name: "id",
        in: "params",
        description: "the id that needs to get a apartment",
        required: true,
      },
    ],
    responses: {
      200: {
        description: "A successful response",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Apartment",
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
