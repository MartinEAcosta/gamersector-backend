const jwt = require('jsonwebtoken');

export const generateJWT = ( id : number , firstname : string  , lastname : string) => {

    return new Promise( ( resolve  , reject ) => {

        const payload = { id , firstname , lastname };

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