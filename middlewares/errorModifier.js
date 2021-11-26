const errorModifier = (req, res, next) => {
  const error = {
    serverErr: async (res, err) => {
      res.status(500).json({
        err: {
          name: "ServerErr",
          message: `International server error: ${err.message}`,
        },
      });
    },
    projectNotFound: async (res) => {
      res.status(400).json({
        err: {
          name: "ProjectNotFound",
          message: "Project is not exist.",
        },
      });
    },
    handleError: async (res, err) => {
      switch (err.name) {
        case "ValidationError":
          return res.status(400).json({ err });
        case "CastError":
          return res.status(400).json({ err });
        default:
          return res.status(500).json({
            err: {
              name: "ServerErr",
              message: `International server error: ${err.message}`,
            },
          });
      }
    },
    noUpload: async (res) => {
      res.status(400).json({
        err: {
          name: "NoUpload",
          message: "No upload file",
        },
      });
    },
    invalidSize: async (res) => {
      res.status(400).json({
        err: {
          name: "InvalidSize",
          message: "File large",
        },
      });
    },
    invalidType: async (res) => {
      res.status(400).json({
        err: {
          name: "InvalidType",
          message: "File format png or jpeg",
        },
      });
    },
    invalidPublicId: async (res) => {
      res.status(400).json({
        err: {
          name: "InvalidPublicId",
          message: "No checked image",
        },
      });
    },
    invalidUploadImage: async (res) => {
      res.status(400).json({
        err: {
          name: "InvalidUploadImage",
          message: "No Upload Image is required",
        },
      });
    },
    appartmentNotFound: async (res) => {
      res.status(400).json({
        err: {
          name: "AppartmentNotFound",
          message: "Appartment is not exist.",
        },
      });
    },
    leadNotFound: async (res) => {
      res.status(400).json({
        err: {
          name: "LeadNotFound",
          message: "Lead is not exist.",
        },
      });
    },
  };

  res.error = error;
  next();
};

module.exports = errorModifier;
