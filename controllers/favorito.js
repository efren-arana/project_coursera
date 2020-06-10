//instruccion para usar nuevas caracteristicas que acepten los navegadores ES6
'use strict'
var Favorito = require('../models/favorito');


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


//function w3schools
function saveDocInCollection(req,res){
    var favorito = new Favorito();
    var params = req.body;
    favorito.title = params.title;
    favorito.description = params.description;
    favorito.url = params.url;

    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true},(err,db)=>{
        if (err) throw err;
        var dbo = db.db('cursofavoritos');
        dbo.collection('coll_curso_favo').insertOne(favorito,(err,res2)=>{
            if (err) throw err;
            console.log("Number of documents inserted: " + res2.insertedCount);
            res.status(200).send({post:true,save:true,favoritoColl:res2.ops});
            db.close();
        });
    });
}

function prueba(req,res){
    
    if (req.params.nombre){
        var nombre = req.params.nombre;
    }else{
        var nombre = 'parametro nombre vacio';
    }
    res.status(200).send({  data: [2,3,4,5,6],
                            message:"prueba api por el metodo get: "+nombre});
}

function getFavorito(req,res){
    var favoritoId = req.params.id;
    Favorito.findById(favoritoId,function(err,favorito){
        if(err){
            res.status(500).send({message:'Error al devolver el marcador'});//status(500) error en el servidor
            //throw err;            
        }else if(!favorito){
            //status(404) no hay respuesta para esta peticion
            res.status(404).send({message:'No hay marcadores'});
        }else{
            res.status(200).send({get:true,id:favoritoId,favorito});
        }
    });
}

function getFavoritos(req,res){
    Favorito.find({}).sort('-_id').exec((err,favoritos)=>{
        if(err){
            //status(500) error en el servidor
            res.status(500).send({message:'Error al devolver el marcador'});
        }else if(!favoritos){
            //status(404) no hay respuesta para esta peticion
            res.status(404).send({message:'No hay marcadores'});
        }else{
            res.status(200).send({favoritos});
        }  
    });
}

function saveFavorito(req,res){
    var favorito = new Favorito();
    var param = req.body; //parametros que llegan por el metodo post
    favorito.title = param.title;
    favorito.description = param.description;
    favorito.url = param.url;

    
    favorito.save((err,favoritoStore)=>{
        if(err){
            //status(500) error en el servidor
            res.status(500).send({message:'Error al guardar el marcador'});
        }else{
            res.status(200).send({post:true,save:true,favorito:favoritoStore});
        } 

    });
}
/**
 * Function que se utiliza a traves del metodo put
 * @param {*} req 
 * @param {*} res 
 */
function updateFavorito(req,res){
    var favoritoId = req.params.id;
    var params = req.body; //parametros que llegan por elmetodo update
    //console.log(params)

    Favorito.findByIdAndUpdate(favoritoId,params,function(err,favorito){
        if(err){
            //status(500) error en el servidor
            res.status(500).send({message:'Error al actualizar el marcador'});
        }else{
            res.status(200).send({put:true,favorito});
        }
    });
}
/**
 * Function que es utilizada a traves del metodo delete
 * @param {Request} req 
 * @param {response} res 
 */
function deleteFavorito(req,res){
    var favoritoId = req.params.id;
    Favorito.findById(favoritoId,function(err,favorito){
        if(err){
            //status(500) error en el servidor  
           res.status(500).send({message:'Error al devolver el marcador'});
        }else if(!favorito){
            //status(404) no hay respuesta para esta peticion
            res.status(404).send({message:'No hay marcadores para esta peticion'});
        }else{
            favorito.remove(err=>{
                if(err){
                    res.status(500).send({message:'Error al borrar'});
                }else{
                    res.status(200).send({message:'El marcador se ha eliminado'});
                }
            });
        }
    });
}
//cuando queremos cargar un fichero como modulo se tiene que exportar
module.exports = {
    prueba,
    getFavorito,
    getFavoritos,
    saveFavorito,
    updateFavorito,
    deleteFavorito,
    getFavoritos,
    saveDocInCollection
};