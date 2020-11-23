
//instruccion para usar nuevas caracteristicas que acepten los navegadores ES6
'use strict'
var MongoClient  = require('mongoose');
const env = require('./environment');
var app = require('./app'); //configuracion de express y de las rutas
//se puedo configurar el puerto en una variable de entorno del servidor
var port = env.environment.port;
var url = env.environment.url;
MongoClient.connect(url, {useNewUrlParser: true,
                          useCreateIndex: true,
                          useUnifiedTopology: true,
                          useFindAndModify: false},
                          (err,res)=>{
    if (err) throw err;
    console.log("Connection Database created!");
    app.listen(port,function(){
        console.log(`App rest running localhost in port: ${port}`);
        console.log("Prueba nodemon!!");
    });
    //db.close();
});
