//instruccion para usar nuevas caracteristicas que acepten los navegadores ES6
'use strict'

var Album = require('../models/Album');

function getAlbum(req,res){
    var albumId = req.params.id;
    Album.findById(albumId,function(err,Album){
        if(err){
            //status(500) error en el servidor
            res.status(500).send({code:500,message:'Error en el servidor al devolver el album!!'});
            //throw err;            
        }else if(!Album){
            //status(404) no hay respuesta para esta peticion
            res.status(404).send({code:404,message:'Error en la peticion!!'});
        }else{
            res.status(200).send({code:0,message:'OK',album: Album});
        }
    });
}

function getAlbums(req,res){
    Album.find({}).sort('title').exec((err,Albums)=>{
        if(err){
            //status(500) error en el servidor
            res.status(500).send({code:500,message:'Error en el servidor al devolver el album!!'});
            //throw err;            
        }else if(!Albums){
            //status(404) no hay respuesta para esta peticion
            res.status(404).send({code:404,message:'Error en la peticion!!'});
        }else{
            res.status(200).send({code:0,message:'OK',albums:Albums});
        }
    });
}

function saveAlbum(req,res){
    var album = new Album(req.body);
    //parametros que llegan por el metodo post en el body
    /*
    var param = req.body; 
    album.title = param.title;
    album.description = param.description;
    */
    
    album.save((err,albumStored)=>{
        if(err){
            //status(500) error en el servidor
            res.status(500).send({code:500,message:'Error en el servidor al guardar el album!!'});
        }else if(!albumStored){
            //status(404) no hay respuesta para esta peticion
            res.status(404).send({code:404,message:'Error en la peticion!!'});
        }else{
            res.status(200).send({code:0,message:'OK',album:albumStored});
        } 

    });
}

function updateAlbum(req,res){
    var albumId = req.params.id;
    const update = req.body;
    
    Album.findByIdAndUpdate(albumId,update,{new: true},(err,albumUpdated)=>{
        if(err){
            //status(500) error en el servidor
            res.status(500).send({code:500,message:'Error en el servidor al actualizar el album!!'});
        }else{
            //albumUpdated = false;
            if(!albumUpdated){
                res.status(404).send({code:404,message:'Error en la peticion para actaulizar el album!!'});
            }else{
                res.status(200).send({code:0,message:'OK',album:albumUpdated});
            }
        }
    });
}

function deleteAlbum(req,res){
    var albumId = req.params.id;

    Album.findByIdAndRemove(albumId,(err,albumDeleted)=>{
        if (err){
            //status(500) error en el servidor
            res.status(500).send({code:500,message:'Error  al eliminar el album!!'});
        }else if(!albumDeleted){
            res.status(404).send({code:404,message:'Error en la peticion para eliminar el album!!'});
        }else{
            res.status(200).send({code:0,message:'OK',album:albumDeleted});
        }
    });
}

module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum,
    deleteAlbum
}; 