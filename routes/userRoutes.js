const express = require('eexpress');
const userController = require ('../controllers/userController');
const { Module } = require('module');
const router = express.router();

router.post('/', userController, createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;