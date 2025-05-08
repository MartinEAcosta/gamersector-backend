import { Request , Response } from 'express';

interface CustomRequest extends Request {
    id?: number;
    firstname?: string;
    lastname?: string;
};

const bcrypt = require('bcrypt');
import { AppDataSource } from '../database/config';
import { generateJWT } from '../helpers/generateJWT';
import { UserModel } from '../models/UserModel';

const userDataSource = AppDataSource.getRepository(UserModel);

export const createNewUser = async( req : Request  , res : Response ) : Promise<void> => {
    const { firstname , lastname , email , password } = req.body;
    
    try{

        const ref = await userDataSource.findOneBy({ email });
        if( ref != null ){
            res.status(400).json({
                ok: false,
                msg: 'El mail indicado ya esta en uso.',
            });
            return;
        }

        const newUser = new UserModel( );
        newUser.firstName = firstname;
        newUser.lastName = lastname;
        newUser.email = email;

        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync( password , salt );

        await userDataSource.save(newUser);

        // Directamente mando el firstname y lastname directamente ya que lo tengo de lo enviado en el body,
        // y no sufre ningun alteramiento por lo tanto no es necesario acceder al newUser
        const token = await generateJWT( newUser.id , firstname , lastname );

        res.status(200).json({
            ok: true,
            msg: 'El usuario se ha creado con éxito.',
            newUser,
            token
        });
        return;
    }
    catch( error ){
        res.status(400).json({
            ok: false,
            msg: 'No fue posible crear el usuario.',
        });
        return;
    }
};

export const loginUser  = async( req : Request , res : Response ) : Promise<void> => {
    const { email , password } = req.body;

    try{

        const ref = await userDataSource.findOneBy({ email });
        if( ref === null ){
            res.status(500).json({
                ok: false,
                msg: 'No se ha encontrado ningun usuario con este email.'
            });
            return;
        }

        const hashedPassword = ref.password;
        const isVerified = bcrypt.compareSync(  password , hashedPassword );

        if( !isVerified ) {
            res.status(500).json({
                ok : false, 
                msg: 'Chequee las credenciales e intente nuevamente.'
            });
            return;
        }

        const token =  await generateJWT(ref.id , ref.firstName , ref.lastName);

        res.status(200).json({
            ok: true,
            msg: 'Login correcto.',
            user: ref,
            token
        });
        return;
    }
    catch( error ){
        res.status(500).json({
            ok : false, 
            msg: 'Chequee las credenciales e intente nuevamente.'
        });
        return;
    }
};

export const reloadToken = async( req : CustomRequest , res : Response ) : Promise<void> => {
    
    const { id , firstname , lastname } = req;

    try{
        
        const token = await generateJWT( id , firstname , lastname );

        if( !token ){
            res.status(500).json({
                ok : false,
                msg: 'No fue posible renovar el token.'
            });
            return;
        }

        res.status(200).json({
            ok: true,
            msg: 'El token ha sido renovado con éxito.',
            token,
        });
        return;
    }
    catch( error ){
        res.status(500).json({
            ok: false,
            msg: 'Fallo la renovación del token.'
        });
        return;
    }
};

