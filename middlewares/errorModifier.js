const errorModifier = (req, res, next) => {
  const error = {
    serverErr: async (res) => {
      res.status(500).json({
        err: {
          name: "ServerErr",
          message: "International server error",
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
              message: "International server error",
            },
          });
      }
    },
  };

  res.error = error;
  next();
};

module.exports = errorModifier;
