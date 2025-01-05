const express = require('express');

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
} = require('../controller/userController');

const {
  signup,
  login,
  resetPassword,
  forgotPassword,
  updatePassword,
  protect,
} = require('../controller/authController');

const router = express.Router();

router.patch('/resetPassword/:token', resetPassword);
router.patch('/updateMyPassword', protect, updatePassword);
router.post('/forgotPassword', forgotPassword);
router.post('/signup', signup);
router.post('/login', login);
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
router.patch('/updateMe', protect, updateMe);
router.patch('/deleteMe', protect, deleteMe);

module.exports = router;
