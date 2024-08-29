const express = require('express');
const userController = require ('../controllers/userController');
const { Module } = require('module');
const router = express.Router();
const user = require ('../models/user');
const {upload , uploadResume} = require ('../controllers/fileUpload');


router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);


router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);

  

module.exports = router;