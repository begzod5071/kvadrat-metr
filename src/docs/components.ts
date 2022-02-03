import { error } from "./errorCodes";
const roleEnum = [
  "createDeveloper",
  "updateDeveloper",
  "deleteDeveloper",
  "createApartment",
  "updateApartment",
  "deleteApartment",
  "getLeads",
  "createLead",
  "updateLead",
  "deleteLead",
  "createProject",
  "updateProject",
  "deleteProject",
  "createRole",
  "deleteRole",
  "viewDeletedData",
  "viewNotActive",
];

export const components = {
  components: {
    schemas: {
      Role: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          permission: {
            type: "array",
            items: {
              type: "string",
            },
            enum: roleEnum,
          },
        },
      },
      User: {
        type: "object",
        properties: {
          email: {
            type: "string",
          },
          name: {
            type: "string",
          },
          role: {
            type: "string",
          },
        },
      },
      Login: {
        type: "object",
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      Developers: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          length: {
            type: "integer",
          },
          developers: {
            type: "object",
          },
        },
      },
      Developer: {
        type: "object",
      },
      NewDeveloper: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          image: {
            type: "object",
            properties: {
              public_id: {
                type: "string",
              },
              url: {
                type: "string",
              },
            },
          },
          infoUz: {
            type: "string",
          },
          infoRu: {
            type: "string",
          },
          infoEn: {
            type: "string",
          },
          phone: {
            type: "string",
          },
          web: {
            type: "string",
          },
          email: {
            type: "string",
          },
          callCenter: {
            type: "string",
          },
          facebook: {
            type: "string",
          },
          instagram: {
            type: "string",
          },
          tiktok: {
            type: "string",
          },
          telegram: {
            type: "string",
          },
          youtube: {
            type: "string",
          },
          twitter: {
            type: "string",
          },
          address: {
            type: "string",
          },
          landmark: {
            type: "string",
          },
          map: {
            type: "string",
          },
        },
      },
      Project: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          length: {
            type: "integer",
          },
          projects: {
            type: "object",
          },
        },
      },
      NewProject: {
        type: "object",
        properties: {
          developerId: {
            type: "string",
          },
          name: {
            type: "string",
          },
          floorFrom: {
            type: "integer",
          },
          floorTo: {
            type: "integer",
          },
          areaFrom: {
            type: "integer",
          },
          areaTo: {
            type: "integer",
          },
          roomsFrom: {
            type: "integer",
          },
          roomsTo: {
            type: "integer",
          },
          repair: {
            type: "boolean",
          },
          parking: {
            type: "boolean",
          },
          characters: {
            type: "object",
            properties: {
              elevator: {
                type: "boolean",
              },
              workzone: {
                type: "boolean",
              },
              terrace: {
                type: "boolean",
              },
              kindergarden: {
                type: "boolean",
              },
              wifi: {
                type: "boolean",
              },
              bedroom: {
                type: "boolean",
              },
              supermarket: {
                type: "boolean",
              },
              parking: {
                type: "boolean",
              },
              panoramicWindow: {
                type: "boolean",
              },
              restaurant: {
                type: "boolean",
              },
              security: {
                type: "boolean",
              },
              playground: {
                type: "boolean",
              },
            },
          },
          year: {
            type: "integer",
          },
          address: {
            type: "string",
          },
          landmark: {
            type: "string",
          },
          map: {
            type: "string",
          },
          images: {
            type: "object",
            properties: {
              public_id: {
                type: "string",
              },
              url: {
                type: "string",
              },
            },
          },
          infoUz: {
            type: "string",
          },
          infoRu: {
            type: "string",
          },
          infoEn: {
            type: "string",
          },
          district: {
            type: "string",
          },
        },
      },
      Apartments: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          length: {
            type: "integer",
          },
          apartments: {
            type: "object",
          },
        },
      },
      Apartment: {
        type: "object",
      },
      NewApartment: {
        type: "object",
        properties: {
          projectId: {
            type: "string",
          },
          image: {
            type: "object",
            properties: {
              public_id: {
                type: "string",
              },
              url: {
                type: "string",
              },
            },
          },
          room: {
            type: "integer",
          },
          area: {
            type: "integer",
          },
          bathroom: {
            type: "integer",
          },
          price: {
            type: "integer",
          },
        },
      },
      Leads: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          length: {
            type: "integer",
          },
          leads: {
            type: "object",
          },
        },
      },
      NewLead: {
        type: "object",
        properties: {
          apartmentId: {
            type: "string",
          },
          name: {
            type: "string",
          },
          phone: {
            type: "string",
          },
          comment: {
            type: "string",
          },
        },
      },
      Token: {
        type: "object",
        properties: {
          accessToken: {
            type: "string",
          },
        },
      },
      Success: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "success message",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "Error code",
            enum: error,
            default: "string",
          },
        },
      },
    },
  },
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};
