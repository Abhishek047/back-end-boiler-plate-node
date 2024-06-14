import { Response, Request } from "express";
import { Route } from '../types/router-types';

export const getTasks: Route = {
    path: "/",
    method: "get",
    handler: (req: Request, res: Response) => {
        console.log("route-hit");
        return res.status(200).json({
            success: true,
        });
    },
};
