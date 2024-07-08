import { router as companyRoutes } from "./api/company/router";
import { router as userRoutes } from "./api/users/router";
import { Routes } from "./types/router-types";

export const routers: Routes[] = [companyRoutes, userRoutes];
