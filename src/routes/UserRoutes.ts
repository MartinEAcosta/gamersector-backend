/*
    Routes of Users
    host + /api/users
*/
const { Router } = require('express');
const { createNewUser , reloadToken , loginUser } = require('../controllers/UserController');
const router = Router();

router.post(
    '/new',
    [
        // middlewares
    ],
    createNewUser
);

router.get(
    '/renew',
    [

    ],
    reloadToken
);

router.post(
    '/',
    [

    ],
    loginUser
)
module.exports = router;
