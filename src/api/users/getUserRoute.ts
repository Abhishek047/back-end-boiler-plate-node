import { Response, Request } from "express";
import { Route } from "../../types/router-types";
import { auth } from "firebase-admin";
import { getUserByEmail } from "../../handlers/users/getUserByEmail";
import { handleResponse } from "../../handlers/route-handlers";
import { CompanyI } from "../../model/interface";
import { getCompanyById } from "../../handlers/company/getCompanyById";
import { ADMIN, USER } from "../../utils/constants";
export const getUserRoute: Route = {
  path: "/",
  method: "get",
  handler: async (req: Request, res: Response) => {
    let user = null;
    const email = req.query.email as string;
    try {
      const hasUser = await auth().getUserByEmail(email);
      user = await getUserByEmail(email);
      if (hasUser && user) {
        let company: CompanyI | null = null;
        if (user.userType !== USER && user.companyId) {
          company = await getCompanyById(user.companyId as string);
        }
        handleResponse({
          res,
          status: 200,
          json: {
            user,
            ...(company ? { company } : {}),
          },
        });
        return res;
      } else {
        handleResponse({
          res,
          status: 404,
          json: {
            message: "user not found",
          },
        });
        return res;
      }
    } catch (error: any) {
      handleResponse({
        res,
        status: 500,
        json: {
          message: error.message || "Server error",
        },
      });
      return res;
    }
  },
};
