import { Response , Request , NextFunction, RequestHandler } from "express";


interface CustomRequest extends Request {
    id?: string;
    firstname?: string;
    lastname?: string;
}

const jwt = require("jsonwebtoken");


const validateJWT = (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {

    const token = req.header('x-token');

    if( !token ){
        res.status(401).json({
            ok: false,
            msg: "No hay token en la petición",
        });
        return;
    }

    try{

        const { id, firstname, lastname } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );


        req.id = id;
        req.firstname = firstname;
        req.lastname = lastname;

    }
    catch(error){
        res.status(401).json({
            ok: false,
            msg: "Token no valido",
        })
        return;
    }

    next();

}

export default validateJWT;