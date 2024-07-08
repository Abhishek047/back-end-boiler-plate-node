import { Types } from "mongoose";
import { MANAGER, USER, ADMIN, OWNER } from "../utils/constants";

export interface CompanyI {
  name: string;
  userLimit: number;
  industry: string;
  userId: Types.ObjectId;
}

export interface UserI {
  firstName: string;
  lastName: string;
  userName?: string;
  email: string;
  number?: string;
  companyId: string | CompanyI | null | Types.ObjectId;
  userType: typeof MANAGER | typeof USER | typeof ADMIN | typeof OWNER;
}
