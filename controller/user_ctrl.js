const User = require('../models/user_models');
const asyncHandler = require('express-async-handler');
const {
    generateToken
} = require('../config/jwt_token');

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({
        email: email
    });
    if (!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error('User Sudah Ada')
        // res.json({
        //     msg: 'User Sudah Ada',
        //     success: false,
        // })
    }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;
    console.log(email, password);
    const findUser = await User.findOne({
        email
    });
    const findUserPass = await User.findOne({
        password
    });

    if (findUser && findUserPass) {
        res.json({
            _id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            mobile: findUser.mobile,
            toke: generateToken(findUser._id)
        });
    } else {
        throw Error('Invalid Credentsial')
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const updateUserId = await User.findByIdAndUpdate(
            id, {
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
            }, {
                new: true,
            }
        );
        res.json(updateUserId);
    } catch (error) {

    }
})

const getAllUser = asyncHandler(async (req, res) => {
    try {
        data = await User.find();
        res.json({
            data,
        });
    } catch (error) {
        throw Error(error);
    }
});

const getUser = asyncHandler(async (req, res) => {
    console.log(req.params);
    const {
        id
    } = req.params;
    try {
        const getUserId = await User.findById(id);
        res.json({
            getUserId,

        })
    } catch (error) {
        throw Error(error);

    }
});
const deleteUser = asyncHandler(async (req, res) => {
    console.log(req.params);
    const {
        id
    } = req.params;
    try {
        const deleteUserId = await User.findByIdAndDelete(id);
        res.json({
            deleteUserId,

        })
    } catch (error) {
        throw Error(error);

    }
});

module.exports = {
    createUser,
    loginUserCtrl,
    getAllUser,
    getUser,
    deleteUser,
    updateUser
};