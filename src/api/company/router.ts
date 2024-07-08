import { Routes } from "../../types/router-types";
import { createNewCompanyRoute } from "./createNewCompanyRoute";

const routes = [createNewCompanyRoute];

export const router: Routes = {
    prefix: "/company",
    routes,
};
