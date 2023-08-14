const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// exports.verifyUser = async (req, res) => {
//     const { username, password } = req.body;

//     const alg = { algorithm: 'HS256' };

//     var message = 'Invalid User/password.';
//     const user = await User.findOne({ username: username });

//     try {
//         console.log(password)
//         if (await user.comparePassword(password)) {
//             const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, alg);
//             req.session.token = token
//             res.json({ token });
//         } else {
//             res.status(401).json({ message: message })
//         }
//     } catch (err) {
//         res.status(401).json()
//     }
// }

exports.getUserById = async (req, res) => {
    // const phone = req.body;
    // const id = req.params.phone;

    try {
        const user = await User.findById(req.params.id);

        res.status(200).json(user);
    } catch (err) {
        res.status(401).json({ message: 'Invalid id.' })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        // console.log(users)
        res.json(users);
    } catch (err) {
        console.log(err);
    }
}

exports.getChannelsByUserId = async (req, res) => {
    try {
        // const user = await User.findById(req.params.id);
        const channels = await User.find({ 
            _id: { '$ne': req.params.id },
            /*department: user.department*/
        });

        res.json(channels);

    } catch (err) {
        console.log(err);
    }
}

exports.newUser = async (req, res) => {
    try {
        if (req.body.password && req.body.username && req.body.phone && req.body.name) {
            const { username, password, phone, name } = req.body;
            var user = new User({
                username: username,
                password: password,
                phone: phone,
                name: name
            })

            const response = await user.save();
            res.json(response);
        } else {
            const { email, name } = req.body;
            var user = new User({
                name: name,
                email: email,
            })

            const response = await user.save();
            res.json(response);
        }
    } catch (err) {
        console.log(err);
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = {
            nome: req.body.nome
        }
        console.log(user)
        const oldUser = await User.findById(req.params.id);

        oldUser.nome = user.nome;

        const response = await User.findByIdAndUpdate(req.params.id, oldUser);

        res.json(response);

    } catch (err) {
        console.log(err);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        // console.log(req.params.phone);
        const response = await User.findByIdAndDelete(req.params.id);
        // console.log(response)
        res.json(response);
    } catch (err) {
        console.log(err);
    }
}