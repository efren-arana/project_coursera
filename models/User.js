//instruccion para usar nuevas caracteristicas que acepten los navegadores ES6
'use strict'

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment');

//esquema del tipo de coleccion
//nos permite definir objetos que nos permite representar a cada uno de los documento de la db
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname:{
        type:String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: false,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

/**
 * Metodo de modelo
 * Funcion de pre-guardado que nos permite hacer algo antes de guardar el obj creado
*/ 
userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


/**
 * Metodo de instancia
 * Metodo usado para crear el token
*/
userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const jwt_key = process.env.JWT_KEY || 'WinterIsComingGOT2019'
    const payload = {_id: user._id,iat:moment().unix(),exp:moment().add(60,'minutes').unix()}
    console.log(payload);
    const token = jwt.sign(payload, jwt_key) //metodo para generar el token
    user.tokens = user.tokens.concat({token}) //concateno el token al array de tokens
    await user.save()
    return token
}

/**
 * Definicion de statico Metodo de modelo
 *  Puede ser accedido sin instanciar el objeto
 * Funcion para logear usuarios en la aplicacion
*/
userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email})
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}



const User = mongoose.model('User', userSchema)
//cuando queremos cargar un fichero como modulo se tiene que exportar
/**Defines a model or retrieves it. Models defined on the mongoose instance 
 * are available to all connection created by the same mongoose instance. 
**/

module.exports = User
