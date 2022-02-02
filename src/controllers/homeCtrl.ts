import {
  IResponse,
  IRequest,
} from "../config/interfaces";

const homeCtrl = {
  getUser: async (req: IRequest, res: IResponse) => {
    try {      
      res.json({
        user: req.user,
      });
    } catch (err: any) {
      return res.error.serverErr(res, err);
    }

  }

};

export default homeCtrl;
