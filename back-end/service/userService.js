const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI;
let refreshToken = process.env.REFRESH_TOKEN;  // Obtido após a autorização
let accessToken = process.env.ACCESS_TOKEN;
let expiryDate;

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: refreshToken });


require('dotenv').config();

exports.verifyUser = async (req, res) => {
    const { username, password } = req.body;

    const alg = { algorithm: 'HS256' };

    var message = 'Invalid User/password.';
    const user = await User.findOne({ username: username });

    if (user) {
        try {
            if (await user.comparePassword(password)) {
                const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, alg);
                res.status(200).json({ token, user });
            } else {
                res.status(401).json({ message: message })
            }
        } catch (err) {
            res.status(401).json()
        }
    } else {
        res.status(401).json({ message: message })
    }
}

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
        let users;
        if (req.query.not === 'true') {
            users = await User.find({ role: { '$ne': req.query.role } })
        } else {
            users = await User.find(req.query);
        }
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
        let user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            name: req.body.name,
            role: req.body.role
        });

        const response = await user.save();
        res.json(response);
    } catch (err) {
        console.log(err);
    }
}

exports.updateUser = async (req, res) => {
    try {
        const oldUser = await User.findById(req.params.id);

        oldUser.username = req.body.username || oldUser.username;
        oldUser.email = req.body.email || oldUser.email;
        oldUser.name = req.body.name || oldUser.name;
        oldUser.role = req.body.role || oldUser.role;
        oldUser.password = req.body.password || oldUser.password;
        oldUser.screenRole = req.body.screenRole || oldUser.screenRole;

        const response = await oldUser.save();

        // const response = await User.findByIdAndUpdate(req.params.id, oldUser, { new: true, runValidators: true, context: 'query' });

        res.json({ message: `User ${response.name} updated successfully` });

    } catch (err) {
        console.log(err);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const response = await User.findByIdAndDelete(req.params.id);
        res.json(response);
    } catch (err) {
        console.log(err);
    }
}

exports.passwordRecoveryEmail = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });

    // const response = await oAuth2Client.getAccessToken();
    // const accessToken = response.res.data.access_token;
    // const expiry_date = response.res.data.expiry_date;

    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
            },
        });

        transporter.sendMail({
            from: "luiz.5.2.1.luiz@gmail.com",
            to: user.email,
            subject: "Reset Password",
            html: `<h1>Change yor password through this Link</h1>
                <p>https://athena-project-manager.vercel.app/updatePassword/${user._id}</p>`,
            auth: {
                user: "luiz.5.2.1.luiz@gmail.com",
                refreshToken: accessToken,
                expires: expiryDate
            },
        });
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
        console.log(err);
    }
}

exports.passwordRecovery = async (req, res) => {
    try {
        let user = User.findById(req.params.id);
        user.password = '1234';
        const response = await User.findByIdAndUpdate(req.params.id, user, { new: true, runValidators: true, context: 'query' });
        res.json({
            message: 'Password changed successfully'
        });
    } catch (err) {
        console.log(err);
    }
}

exports.oauth = async (req, res) => {
    try {
        if (req.query.code) {
            const getToken = async (code) => {
                const { tokens } = await oAuth2Client.getToken(code);
                console.log(tokens);
                accessToken = tokens.access_token;
                refreshToken = tokens.refresh_token;


                console.log({
                    accessToken: accessToken,
                    regresh_token: refreshToken
                })
            };

            getToken(req.query.code);
        } else {
            const authorizeUrl = oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: 'https://mail.google.com/', // Use os escopos apropriados
            });

            res.status(200).json({ url: authorizeUrl });
        }
    } catch (err) {
        console.log(err);
    }
}