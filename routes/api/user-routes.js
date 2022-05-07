const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  DeleteFriend
} = require('../../controllers/user-controller')

// Set up GET all and POST at /api/pizzas
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

  router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(DeleteFriend);

module.exports = router;