import { Response, Request } from "express";
import { Route } from "../../types/router-types";
import { ValidatorObject } from "../../types/validator-types";
import { validate } from "../../utils/validator";
import { handleError } from "../../utils/error";

// Define an interface for the expected request body structure
type CreateCompanyRequestBody = {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    industry: string;
    password: string;
};
type CompanyValidatorObject = ValidatorObject<CreateCompanyRequestBody>;

const validator: CompanyValidatorObject = {
    firstName: (value) => !!value,
    lastName: (value) => !!value,
    email: (value) => !!value,
    companyName: (value) => !!value,
    industry: (value) => !!value,
    password: (value) => !!value,
};

export const createNewCompanyRoute: Route = {
    path: "/",
    method: "post",
    handler: async (req: Request, res: Response) => {
        try {
            const requestBody = req.body;
            const { success, reason, data } = validate<CreateCompanyRequestBody>(
                validator,
                requestBody
            );
            // performValidation
            if (!success) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    reason: reason,
                });
            }
            return res.status(200).json({
                success: true,
            });
        } catch (error: any) {
            const { status, message } = handleError(error);
            return res.status(status).json({
                success: false,
                message: message,
            });
        }
    },
};
