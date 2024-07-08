import { Routes } from "../../types/router-types";
import { getUserRoute } from "./getUserRoute";

const routes = [getUserRoute];

export const router: Routes = {
  prefix: "/user",
  routes,
};
