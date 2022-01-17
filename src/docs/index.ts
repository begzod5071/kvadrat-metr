import { info } from "./info";
import { servers } from "./servers";
import { paths } from "./paths";
import { components } from "./components";

export const docs = {
  ...info,
  ...servers,
  ...components,
  ...paths,
};
