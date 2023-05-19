import { getTasks } from "./getTasks";

const routes = [getTasks];

export const router = {
  prefix: "/task",
  routes,
};
