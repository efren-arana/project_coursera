const express = require('express')
const auth = require('../middleware/auth')
const userController = require("../controllers/user")
const router = express.Router()

router.post('/users/register', userController.saveUser)
router.post('/users/login', userController.loginUser)
//obtiene el profile del usuario
router.get('/users/me',auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})

//falta enviar middelware de autenticacion
router.get('/users/getImage/:imageFile',userController.getImageFile)

//cargo un archivo al servidor
router.post('/users/uploadFile/:id',userController.uploadFile)


router.put('/users/update/:id',auth,userController.updateUser)
router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router