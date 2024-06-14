import { Routes } from "../types/router-types";
import { getTasks } from "./getTasks";

const routes = [getTasks];

export const router: Routes = {
  prefix: "/task",
  routes,
};
