//instruccion para usar nuevas caracteristicas que acepten los navegadores ES6
'use strict'

var express = require('express');
var FavoritoController = require('../controllers/favorito');

var api = express.Router();

//funcion de callback(funcion de devolucion de llamada): 
//funcion que se envia como parametro se ejecuta cuando se realiza la peticion
//will be executed when someone tries to access the computer on port 8080.

api.get('/prueba/:nombre?',FavoritoController.prueba);
api.get('/favorito/:id',FavoritoController.getFavorito);//parametro obligatorio
api.get('/favoritos',FavoritoController.getFavoritos);//obtiene la coleccion de documentos
api.post('/favorito',FavoritoController.saveFavorito);//parametro obligatorio
api.put('/favorito/:id',FavoritoController.updateFavorito);//parametro obligatorio
api.delete('/favorito/:id',FavoritoController.deleteFavorito);
api.post('/favoritoColl',FavoritoController.saveDocInCollection);

//cuando queremos cargar un fichero como modulo se tiene que exportar
module.exports = api;
