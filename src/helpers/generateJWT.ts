const jwt = require('jsonwebtoken');

export const generateJWT = ( id : number , firstName : string  , lastName : string) => {

    return new Promise( ( resolve  , reject ) => {

        const payload = { id , firstName , lastName };

        jwt.sign( payload , process.env.SECRET_JWT_SEED , {
            expiresIn: '1h'
        }, ( err : string , token : string ) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve(token);
        })
    });

}