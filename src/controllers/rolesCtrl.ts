import { IRequest, IResponse } from "../config/interfaces";
import Roles from "../models/roleModel";

const rolesCtrl = {
  // Create Role by Super Admin
  createRole: async (req: IRequest, res: IResponse) => {
    try {
      const { name, permissions } = req.body;
      const Allowed = req.isAllowed

      if (!Allowed) return res.error.notAllowed(res);
      const newRole = new Roles({
        name: name.toLowerCase(),
        permissions,
      });

      await newRole.save();

      res.status(201).json({ message: "Role created" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },

  // Delete Role
  deleteRole: async (req: IRequest, res: IResponse) => {
    try {
      const id: string = req.params.id;
      const Allowed = req.isAllowed
      if (!Allowed) return res.error.notAllowed(res);

      const findRole = await Roles.findById(id);
      if (!findRole) return res.error.roleNotExist(res);

      await Roles.findByIdAndDelete(id);

      res.status(201).json({ message: "Role deleted" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
};

export default rolesCtrl;
