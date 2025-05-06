const { request , response } = require('express');
import { DataSource, Like } from "typeorm";
import { AppDataSource } from "../database/config";
const { generateJWT } = require("../helpers/generateJWT");
import { UserModel } from "../models/UserModel";
const bcrypt = require('bcrypt');

const User = require('../models/UserModel');
const userDataSource = AppDataSource.getRepository(UserModel);

export const createNewUser =  async(  req  , res = response  ) => {
    const { firstname , lastname , email , password } = req.body;
    try{

        if( !firstname || !lastname || !email ){ 
            return res.status(400).json({
                ok: false,
                msg: 'Chequee los campos e intente nuevamente.',
            })
        }

        const ref = await userDataSource.findOne({ where: { email : email } });

        if( ref ){
            return res.status(400).json({
                ok: false,
                msg: 'El mail indicado ya esta en uso.',
            });
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
        const token : string = await generateJWT( newUser.id , firstname , lastname );

        return res.status(200).json({
            ok: true,
            msg: 'El usuario se ha creado con éxito.',
            newUser,
            token
        });
    }
    catch( error ){
        return res.status(400).json({
            ok: false,
            msg: 'No fue posible crear el usuario.',
        });
    }
};

export const loginUser = async( req , res = response ) => {
    try{

    }
    catch( error ){
        console.log(error);
    }
}

export const reloadToken = async( req , res = response ) => {
    try{

    }
    catch( error ){
        console.log(error);
    }
}

