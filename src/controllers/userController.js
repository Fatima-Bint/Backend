const User = require('../models/userModel')

function handleError(error) {
    let err = { username: '', email: '', password: '' }

    console.log(error)

    if (error.message === "incorrect username") {
        err.username = 'that username does not exist'
    }

    if (error.message === 'incorrect email') {
        err.email = 'that email is not valid'
    }

    if (error.message === 'incorrect password') {
        err.password = 'the password is incorrect'
    }

    if (error.code === 11000) {
        err.email = 'that email is registered already'

        return err
    }

    if (error.message.includes('user validation failed')) {
        Object.values(error.errors).forEach(({ properties }) => {
            err[properties.path] = properties.message
        })
    }

    return err
}

//using object to export the fxns
const userControl = {}

//create a user = POST method
//this technically dangerous
//when i person sends an empty body Object to the backend it will throw an error but a 
userControl.createUser = async (req, res) => {
    try {
        let newUser = new User(req.body)
        let result = await newUser.save()
        res.status(200).send({ message: 'Your account has been created', result })
    } catch (error) {
        const warnings = handleError(error)
        res.status(400).json({ warnings })

    }
}

// read a user detail = GET method
userControl.getUserDetails = async (req, res) => {
    try {
        let person = await User.find({ username: req.body.username })
        if (!person) {
            res.status(400).send({ message: "User does not exist, check planet Mars" })
        } else {
            res.status(200).send({ message: 'Welcome to Earth, We have found the user', person })
        }
    } catch (error) {
        console.log(error)
    }
}

//update a user detail = UPDATE/PUT method
userControl.updateUserDetails = async (req, res) => {
    const { username, email, password } = req.body  //detruction of codes
    try {
        let person = await User.findOneAndUpdate({ _id: req.params.id }, { username, email, password })
        res.status(200).send({ message: 'Your account has successfully been updated', person })


    } catch (error) {
        console.log(error)
    }
}

//delete a user detail = DELETE method
userControl.deleteUser = async (req, res) => {

    try {
        let person = await User.findOneAndDelete({ _id: req.params.id })
        res.status(200).send({ message: 'Your account has successfully been deleted' })
    } catch (error) {
        console.log(error)

    }
}

//asynchronous - cleaner way to write function
/*useEfect( asyc function loadData() {
    await axios.get ('https://facebook.com')
    function doSmth() {}
})*/

module.exports = userControl