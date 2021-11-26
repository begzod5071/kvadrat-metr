const Lead = require("../models/leadModel");
const Appartment = require("../models/appartmentModel");

const leadCtrl = {
  getLeads: async (req, res) => {
    try {
      const leads = await Lead.find({});

      res.json({ leads });
    } catch (err) {
      return res.error.serverErr(res, err);
    }
  },
  createLead: async (req, res) => {
    try {
      const { appartmentId, name, comment, phone } = req.body;

      const appartment = await Appartment.findById(appartmentId);
      if (!appartment) return res.error.appartmentNotFound(res);

      const newLead = new Lead({
        appartmentId,
        name,
        phone,
        comment,
      });
      await newLead.save();

      res.status(201).json({ message: "Created lead" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  updateLead: async (req, res) => {
    try {
      const lead = await Lead.findByIdAndUpdate(req.params.id, req.body);
      if (!lead) return res.error.leadNotFound(res);

      res.json({ message: "Updated lead" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  deleteLead: async (req, res) => {
    try {
      const lead = await Lead.findByIdAndDelete(req.params.id);
      if (!lead) return res.error.leadNotFound(res);

      res.json({ message: "Deleted lead" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
};

module.exports = leadCtrl;
