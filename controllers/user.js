//instruccion para usar nuevas caracteristicas que acepten los navegadores ES6
'use strict'
const fs = require('fs');
const path = require('path');
var User = require('../models/User');

async function saveUser(req,res){
      // Create a new user
      try { //dentro del bloque se atrapa cualquier error
        
        const user = new User(req.body)
        console.log(req.body)
        //user.image = "null";
            //La encriptacion de la contrasena la realiza el modelo
            //usa el metodo de pre-guardado del Schema antes de guardar el password la encripta
            //la constrasena es requerida por lo tanto no se realizan validaciones
            //las propiedades son requeridas para realizar el consumo del metodo de la api
        await user.save();//metodo de mongoose para guardar el obketo en la DB
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
}


async function loginUser(req,res){
    //Login a registered user
    try {
        const { email, password } = req.body
        //validar tambien el surname(nombre de usuario)
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send({error})
    }
}


async function updateUser(req,res){
    var userId = req.params.id;
    const update = req.body;
    //falta encriptar contasena actaulizada
    if(userId != req.user._id){
        return res.status(500).send({message:'El id del usuario no es igual al id del token!!'});
    }
    User.findByIdAndUpdate(userId,update,{new: true},function(err,userUpdated){
        if(err){
            //status(500) error en el servidor
            res.status(500).send({message:'Error al actualizar el usuario!!'});
        }else{
            if(!userUpdated){
                res.status(404).send({message:'NO se actualizo el usuario!!'});
            }else{
                res.status(200).send(userUpdated);
            }
        }
    });
}
function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    console.log('Image File: '+imageFile);

    var path_image = './uploads/users/img/'+imageFile;
    console.log('Ruta: '+path_image);

    fs.exists(path_image,(exists)=>{
            if(exists){
                res.sendFile(path.resolve(path_image));
            }else{
                res.status(404).send({message:'No existe el fichero!!'}); 
            }
    });
}
async function uploadFile(req,res){
    var userId = req.params.id;
    if(req.files){
        console.log(req.files);
        
        var file  = req.files.file;
        
        var extSplit = file.name.split('.');
        var fileExt = extSplit[1];


        if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'gif'){
            User.findByIdAndUpdate(userId,{image:file.name},{new: true},(err,userUpdated)=>{
                if(err){
                    //status(500) error en el servidor
                    res.status(500).send({message:'Error al cargar Imagen el usuario!!'});
                }else{
                    if(!userUpdated){
                        res.status(404).send({message:'NO se actualizo la imagen de usuario!!'});
                    }else{
                        file.mv('./uploads/users/img/'+file.name,(err)=>{
                            if(err)
                                throw err;
                              
                        });
                        res.status(200).send(userUpdated);
                    }
                }
            });
            
        }else{
            res.status(200).send({message:'Extencion del archivo no valida!!'});
        }
        
    }else{
        res.status(404).send({message:'NO se  ha subido ninguna Imagen!!'});
    }
    
}
//cuando queremos cargar un fichero como modulo se tiene que exportar
module.exports = {
    saveUser,
    loginUser,
    updateUser,
    uploadFile,
    getImageFile
};