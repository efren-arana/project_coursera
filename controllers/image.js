//instruccion para usar nuevas caracteristicas que acepten los navegadores ES6
'use strict'

var Album = require('../models/Album');
var Image = require('../models/Image');

function getImage(req,res){
    var imageId = req.params.id;
    Image.findById(imageId,(err,Image)=>{
        if(err){
            //status(500) error en el servidor
            res.status(500).send({cod:500,message:'Error en el servidor al devolver la imagen!!'});
            //throw err;            
        }else if(!Image){
            //status(404) no hay respuesta para esta peticion
            res.status(404).send({cod:404,message:'Error en la peticion!!'});
        }else{
            res.status(200).send({cod:0,message:'OK',image: Image});
        }
    });
}

module.exports = {
    getImage
};