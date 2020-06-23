//instruccion para usar nuevas caracteristicas que acepten los navegadores ES6
'use strict'
const express = require('express')
const imageController = require("../controllers/image")
const router = express.Router()

router.get('/image/:id',imageController.getImage);
router.post('/image/register',imageController.saveImage);
router.get('/images/:albumId?',imageController.getImages);
router.put('/image/:id',imageController.updateImage);
router.delete('/image/:id',imageController.deleteImage);
router.post('/image/uploadImage/:id',imageController.uploadFile);

//falta enviar middelware de autenticacion
router.get('/image/getImage/:imageFile', imageController.getImageFile)


module.exports = router;