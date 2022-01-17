export const getAllApartment = {
  get: {
    summary: "Get all Apartments",
    description: "To get all apartments",
    tags: ["Apartment"],
    operationId: "apartment",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      200: {
        description: "A successful response",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Apartments",
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
