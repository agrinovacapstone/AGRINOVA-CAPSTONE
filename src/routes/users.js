const express = require('express');

const UserController = require('../controller/users.js');

const router = express.Router();

// CREATE - GET
router.post('/', UserController.createNewUser);

// CREATE - POST
router.get('/', UserController.getAllUsers);

// UPDATE - PATCH
router.patch('/:idUser', UserController.updateUser); 

// DELETE - DELETE
router.delete('/:idUser', UserController.deleteUser); 



module.exports = router;