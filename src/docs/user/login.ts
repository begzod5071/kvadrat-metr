export const login = {
  post: {
    summary: "login",
    description: "To log in only specific user",
    tags: ["User"],
    operationId: "login",
    // parameters: [
    //   {
    //     name: "body",
    //     in: "body",
    //     description: "the object that needs to log in to site",
    //     required: true,
    //     schema: {
    //       $ref: "#/components/schemas/Login",
    //     },
    //   },
    // ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Login",
          },
        },
      },
    },
    responses: {
      200: {
        description: "A successful response",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Token",
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
