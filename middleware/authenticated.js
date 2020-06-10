//middelware: piece of software que se ejecuta antes de que se envien los datos al controlador 
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const moment = require('moment');
const auth = function(req, res, next){
    if(!req.header.Authorization){
        return res.status(403).send({message:"La peticion no tiene cabecera de autenticacion!!"});
    }
    const token = req.header('Authorization').replace('Bearer ', '')
    try {
        const data = jwt.verify(token, process.env.JWT_KEY); //decode token
        if(data.exp <= moment().unix()){
            return res.status(401).send({message:"El Token ha expirado!!"});
        }
        const user = User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next() 
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth