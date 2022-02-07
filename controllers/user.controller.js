const User = require("../models/user.model.js");
const availableUsers = require("../helpers/usersAvailable.js");

const config = require("../config/config");
const jwt = require("jsonwebtoken");
const { NotFoundError } = require("../helpers/utility");


// Login
exports.login = async (req, res) => {
	try {
        // Check user exist
        const user = availableUsers.usersAvailable.filter(f => f.clientId == req.body.clientId && f.clientSecret == req.body.clientSecret)[0];
        const rememberMe = req.body.remember;

        const tokenExpiry = rememberMe ? '7d' : '1h';

        if (user) {
            // Create and assign token
            const token = jwt.sign({ id: req.body.clientId, secret: req.body.clientSecret }, config.TOKEN_SECRET, { expiresIn: tokenExpiry });
            res.header("auth-token", token).send({
                "token": token
            });
        } else {
            res.status(500).send("Error retrieving User");
        }
    }
    catch (err) {
        if (err instanceof NotFoundError) {
            res.status(401).send(`Mobile/Email or Password is wrong`);
        }
        else {
            let error_data = {
                entity: 'User',
                model_obj: { param: req.params, body: req.body },
                error_obj: err,
                error_msg: err.message
            };
            res.status(500).send("Error retrieving User");
        }
    }

};
