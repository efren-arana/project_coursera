//Middleware es un software / pieza de código 
//que actúa como un puente entre la base de datos y la aplicación,
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const moment = require('moment');

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    try {
        const payload = jwt.decode(token, process.env.JWT_KEY)
        //const payload = jwt.verify(token, process.env.JWT_KEY)
        
        const user = await User.findOne({ _id: payload._id, 'tokens.token': token })
        
        if (!user) {
            return res.status(401).send({message:"El Token no existe!!"});
        }
        
        //validacion no necesaria ya que es atrapada por la exception al verificar(verify) el token.
        if((payload.exp-payload.iat) <= (moment().unix()-payload.iat)){
            console.log('tiempo duracion: '+(payload.exp-payload.iat));
            console.log('tiempo transcurrido: '+(moment().unix()-payload.iat));
            return res.status(401).send({message:"El Token ha expirado!!"});
        }
        
        req.user = user
        req.token = token
        next() //funcion para salir del middelware
    } catch (error) {
        console.log(error)
        res.status(401).send({ error: 'Not authorized to access this resource',
                                message: error.message  })
    }

}
module.exports = auth