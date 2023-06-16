import { Request, Response, NextFunction } from "express";

const isLoggedIn = (req: Request,res:Response,next:NextFunction) => {
    if(req.session.user?.login == true){
        return next();
    }
    res.redirect("/login");
}

export default isLoggedIn;