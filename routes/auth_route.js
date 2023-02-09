const express = require('express');
const {
    createUser,
    loginUserCtrl,
    getAllUser,
    getUser,
    deleteUser,
    updateUser
} = require('../controller/user_ctrl');
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/all-user", getAllUser);
router.get("/:id", getUser);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);




module.exports = router;