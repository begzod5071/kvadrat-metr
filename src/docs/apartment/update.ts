export const update = {
  put: {
    summary: "Update a apartment",
    description: "To update a developer only specific user",
    tags: ["Apartment"],
    operationId: "apartmentUp",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "id",
        in: "params",
        description: "the id that needs to update a apartment",
        required: true,
      },
      {
        name: "body",
        in: "body",
        description:
          "the object that needs to update a apartment and it is optional",
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
