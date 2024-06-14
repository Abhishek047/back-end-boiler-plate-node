import { Response, Request, NextFunction } from "express"

export type Middleware = (req: Request, res: Response, next: NextFunction) => void
export type Route = {
    path: string,
    method: 'get' | 'post' | 'delete' | 'patch',
    handler: (req: Request, res: Response) => void
    middleware?: Middleware[]
}
export type Routes = {
    prefix: string;
    routes: Route[];
}