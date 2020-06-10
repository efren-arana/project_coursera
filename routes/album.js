//instruccion para usar nuevas caracteristicas que acepten los navegadores ES6
'use strict'
const express = require('express')
const auth = require('../middleware/auth')
const albumController = require("../controllers/album")
const router = express.Router()


router.get('/album/:id',albumController.getAlbum);
router.get('/albums',albumController.getAlbums);
router.post('/album/register',albumController.saveAlbum);
router.put('/album/:id',albumController.updateAlbum);
router.delete('/album/:id',albumController.deleteAlbum);
module.exports = router;