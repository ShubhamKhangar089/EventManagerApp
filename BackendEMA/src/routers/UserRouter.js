const express = require('express');
const { userRegister, userLogin, getAllUsers } = require('../controllers/UserControllers');

const userRouter = express.Router();

userRouter.get('/all', getAllUsers)

userRouter.post('/register', userRegister)

userRouter.post('/login', userLogin)

// userRouter.post('/logout', userRegister)

module.exports = userRouter;