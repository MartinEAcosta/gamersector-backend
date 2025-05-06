import { Request , Response , NextFunction, RequestHandler } from 'express';
import { check , validationResult } from 'express-validator';

export const validateFields  = ( req : Request , res : Response  , next : NextFunction ) : Promise<void> => {
    
    const errors = validationResult( req );
    if( !errors.isEmpty() ){
        res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
        return;
    }

    next();
}

export default validateFields;