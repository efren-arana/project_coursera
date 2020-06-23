
//instruccion para usar nuevas caracteristicas que acepten los navegadores ES6
'use strict'
var MongoClient  = require('mongoose');
var app = require('./app'); //configuracion de express y de las rutas
//se puedo configurar el puerto en una variable de entorno del servidor
var port = process.env.PORT || 3678;
var url = process.env.MONGODB_URL || 'mongodb+srv://dbProjectEfren:12345@cluster0-cqwe4.mongodb.net/user-registration-db';
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
