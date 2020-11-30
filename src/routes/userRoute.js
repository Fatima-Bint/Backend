const {Router} = require ('express')
const router = Router()

const {
    createUser,
    getUserDetails,
    updateUserDetails, 
    deleteUser 
} = require('../controllers/userController')

// the route for creating an acount
router.post('/api/user/new', createUser)

//route for getting account details
router.get('/api/user/username', getUserDetails)

//route for updating account details
router.put('api/user/update', updateUserDetails)

//route for deleting account
router.delete('api/user/delete', deleteUser)

module.exports = router