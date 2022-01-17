import { create } from "./role/create";
import { deleteRole } from "./role/delete";
import { signup } from "./user/signup";
import { login } from "./user/login";
import { getAllDevelopers } from "./developer/allDevelopers";
import { developer } from "./developer/oneDeveloper";
import { create as createDev } from "./developer/create";
import { update } from "./developer/update";
import { deleteDev } from "./developer/delete";
import { getProjects } from "./project/allProjects";
import { create as createProject } from "./project/create";
import { update as updateProject } from "./project/update";
import { deleteProject } from "./project/delete";
import { getAllApartment } from "./apartment/allApartments";
import { apartment } from "./apartment/oneApartment";
import { create as createApartment } from "./apartment/create";
import { update as updateApartment } from "./apartment/update";
import { deleteApartment } from "./apartment/delete";
import { getLeads } from "./lead/allLeads";
import { create as createLead } from "./lead/create";
import { update as updateLead } from "./lead/update";
import { deleteLead } from "./lead/delete";

export const paths = {
  paths: {
    "/role": {
      ...create,
    },
    "/role/{roleId}": {
      ...deleteRole,
    },
    "/signup": {
      ...signup,
    },
    "/login": {
      ...login,
    },
    "/developer": {
      ...getAllDevelopers,
      ...createDev,
    },
    "/developer/{developerId}": {
      ...developer,
      ...update,
      ...deleteDev,
    },
    "/project": {
      ...getProjects,
      ...createProject,
    },
    "/project/{projectId}": {
      ...updateProject,
      ...deleteProject,
    },
    "/apartment": {
      ...getAllApartment,
      ...createApartment,
    },
    "/apartment/{apartmentId}": {
      ...apartment,
      ...updateApartment,
      ...deleteApartment,
    },
    "/leads": {
      ...getLeads,
      ...createLead,
    },
    "/lead/{leadId}": {
      ...updateLead,
      ...deleteLead,
    },
  },
};
