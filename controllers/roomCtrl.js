const Room = require("../models/appartmentModel");

const roomCtrl = {
  getRooms: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = roomCtrl;
