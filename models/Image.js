//instruccion para usar nuevas caracteristicas que acepten los navegadores ES6
'use strict'

var mongoose = require('mongoose');
//esquema del tipo de registro o documento
//nos permite definir objetos que nos permite representar a cada uno de los documento de la db
var Schema = mongoose.Schema;

var ImageSchema = Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    picture:{
        type: String,
        required: true,
        trim: true
    },
    album:{
        type:Schema.ObjectId, 
        ref: 'Album'
    }
})

//cuando queremos cargar un fichero como modulo se tiene que exportar
/**Defines a model or retrieves it. Models defined on the mongoose instance 
 * are available to all connection created by the same mongoose instance. 
**/
module.exports =  mongoose.model('Favorito',ImageSchema);
