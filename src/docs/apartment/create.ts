export const create = {
  post: {
    summary: "Add a new apartment",
    description: "To create new apartment only specific user",
    tags: ["Apartment"],
    operationId: "apartmentNew",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "body",
        in: "body",
        description: "the object that needs to create a new apartment",
        required: true,
        schema: {
          $ref: "#/components/schemas/NewApartment",
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
