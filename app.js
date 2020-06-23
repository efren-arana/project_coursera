/**
 * Fichero que contiene las configuraciones de express
 * Configuraciones de las rutas 
 */
//instruccion para usar nuevas caracteristicas que acepten los navegadores ES6
'use strict'
//framework de backend
var express = require('express'); //se carga el modulo o pck express
var app = express();
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
//carga todos los ficheros de las configuraciones de las rutas
var userRouter = require('./routes/user');
var favRouter = require('./routes/favorito'); 
var albumRouter = require('./routes/album');
var imageRouter = require('./routes/image');
//body-parse: recibe los datos  que llegan como parametros a traves del metodo post
//nos permite capturalos los convierte en objetos js de forma que se puedan procesar
//se ejecuta este middleware antes que se realice la peticion completa
//middleware: funcionalidad que se ejecuta antes que se ejecute el codigo de node
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json());

//Configuracion que nos permite interactuar con nuestro cliente web
//Nos permite interactuar con nuestro cliente cuando se encuentre en otro dominio
//(CORS)configuraciones de los header cabeceras http 
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');//permite que se puedan realizar peticiones de cualquier dominio
    res.header('Access-Control-Allow-Headers','Authorization,X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Request-Method');
    //metodos http que pueden llegar
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
    next();//se lanza la funcion next para salir  del Middleware
});

//Middleware
app.use(fileUpload());

//middleware antes de recibir la peticion http se ejecuta este metodo
app.use('/api',favRouter); //se usa dentro de express para cargar todaas las rutas
app.use('/api',userRouter);
app.use('/api',albumRouter);
app.use('/api',imageRouter);
//cuando queremos cargar un fichero como modulo se tiene que exportar
module.exports = app;