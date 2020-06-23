//instruccion para usar nuevas caracteristicas que acepten los navegadores ES6
'use strict'

var Album = require('../models/Album');
var Image = require('../models/Image');
const fs = require('fs');
const path = require('path');

function getImage(req,res){
    var imageId = req.params.id;
    Image.findById(imageId,(err,image)=>{
        if(err){
            //status(500) error en el servidor
            res.status(500).send({code:500,message:'Error en el servidor al devolver la imagen!!'});
            //throw err;            
        }else if(!image){
            //status(404) no hay respuesta para esta peticion
            res.status(404).send({code:404,message:'Error en la peticion,NO existe la imagen!!'});
        }else{
            Album.populate(image,{path:'album'},(err,image)=>{
                if(err){
                    res.status(404).send({code:404,message:'Error al realizar el matching!!'});
                }else{
                    res.json({code:0,message:'OK',image: image});
                }
            });
        }
    });
}

async function uploadFile(req,res){
    var imageId = req.params.id;
    if(req.files){
        console.log(req.files);
        //nombre de campo que envia la imagen
        var file  = req.files.file_image; 
        
        var extSplit = file.name.split('.');
        var fileExt = extSplit[1];
        let md5 = file.md5+'.'+fileExt;

        if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'gif'){
            Image.findByIdAndUpdate(imageId,{picture:md5},{new: true},(err,imagenUpdated)=>{
                if(err){
                    //status(500) error en el servidor
                    res.status(500).send({code:500,message:'Error al cargar Imagen!!'});
                }else{
                    if(!imagenUpdated){
                        res.status(404).send({code:404,message:'NO se actualizo la imagen!!'});
                    }else{
                        file.mv('./uploads/album/'+md5,(err)=>{
                            if(err){
                               // throw err;
                                res.status(500).send({code:500,message:'Error al cargar Imagen en la ruta del servidor!!'});
                            }
                        });
                        res.status(200).send({code:0,message:'OK',user:imagenUpdated});
                    }
                }
            });
            
        }else{
            res.status(400).send({code:400,message:'Extencion del archivo no valida!!'});
        }
        
    }else{
        res.status(404).send({code:400,message:'NO se  ha subido ninguna Imagen!!'});
    }
    
}


function getImages(req,res){
    var albumId = req.params.albumId;

    if(albumId){
        //obtengo las imagenes que perteneces a ese album
        var find = Image.find({album:albumId}).sort('title');
    }else{
        //obtengo todas las imagenes
        var find = Image.find({}).sort('title');
    }

    find.exec((err,imagesFind)=>{
        if(err){
            //status(500) error en el servidor
            res.status(500).send({code:500,message:'Error en el servidor al devolver las imagenes!!'});
            //throw err;            
        }else if(!imagesFind){
            //status(404) no hay respuesta para esta peticion
            res.status(404).send({code:404,message:'Error en la peticion!!'});
        }else{
            Album.populate(imagesFind,{path:'album'},(err,imagesPo)=>{
                if(err){
                    res.status(404).send({code:404,message:'Error al realizar el matching!!'});
                }else{
                    res.status(200).send({code:0,message:'OK',images:imagesPo});
                }
            });
           
        }
    });
}
function saveImage(req,res){
    var image = new Image();
    var params = req.body;
    console.log(params);
     image.title = params.title;
     image.picture = params.picture;  
     image.album = params.album;

        image.save((err,imagaSaved)=>{
            if(err){
                //status(500) error en el servidor
                res.status(500).send({code:500,message:'Error al guardar la imagen!!'});

            }else if(!imagaSaved){
                //status(404) no hay respuesta para esta peticion
                res.status(404).send({code:404,message:'Error en la peticion!!'});
            }else{
                res.status(200).send({code:0,message:'OK',image:imagaSaved});
            }
         });
}

function updateImage(req,res){
    var imageId = req.params.id;

    const update = req.body;
    
    Image.findByIdAndUpdate(imageId,update,{new: true},(err,imagenUpdated)=>{
        if(err){
            //status(500) error en el servidor
            res.status(500).send({code:500,message:'Error en el servidor al actualizar la imagen!!'});
        }else{
            //imagenUpdated = false;
            if(!imagenUpdated){
                res.status(404).send({code:404,message:'Error en la peticion para actualizar la imagen!!'});
            }else{
                res.status(200).send({code:0,message:'OK',imagen:imagenUpdated});
            }
        }
    });
}

function deleteImage(req,res){
    var imageId = req.params.id;

    
    Image.findByIdAndRemove(imageId,(err,imagenDeleted)=>{
        if(err){
            //status(500) error en el servidor
            res.status(500).send({code:500,message:'Error en el servidor al eliminar la imagen!!'});
        }else{
            //imagenUpdated = false;
            if(!imagenDeleted){
                res.status(404).send({code:404,message:'Error en la peticion para eliminar la imagen!!'});
            }else{
                res.status(200).send({code:0,message:'OK',imagen:imagenDeleted});
            }
        }
    });
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    console.log('Image File: '+imageFile);
    
    var path_image = './uploads/album/'+imageFile;
    console.log('Ruta: '+path_image);

    fs.exists(path_image,(exists)=>{
            if(exists){
                res.sendFile(path.resolve(path_image));
            }else{
                res.status(404).send({code:500,message:'No existe el fichero!!'}); 
            }
    });
}


module.exports = {
    getImage,
    saveImage,
    getImages,
    updateImage,
    deleteImage,
    uploadFile,
    getImageFile
};