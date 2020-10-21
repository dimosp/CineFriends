const jwt = require("jsonwebtoken");
require("dotenv-safe").config();
const expressJwt = require("express-jwt");
const User = require("../models/user");

// create async function, since program waits until it gets the data from DB
exports.signup = async (req, res) => {
    const userExists = await User.findOne({email: req.body.email});
    if (userExists) return res.status(403).json({
        error: "Email is taken!"
    });

    const user = await new User(req.body);
    await user.save();
    res.status(200).json({message: "Signup is successful! Please log-in."});
};

exports.signin = (req, res) => {
    // find the user according to their email
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        
        // if error or no user
        if (err || !user) {
            return res.status(401).json({
                error: "User with that email does not exist! Please signup."
            });
        }
        
        // if user is found make sure that email and password match
        // create an authenticate method in model and use it here
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match!"
            });
        }
        // generate a token with a user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie("t", token, {expire: new Date() + 9999});
        // return response with user and token to frontend client
        const {_id, name, email} = user;
        return res.json({token, user: {_id, name, email}});
    });
};

exports.signout = (req, res) => {
    // clear the cookie with the name "t"
    res.clearCookie("t");
    return res.json({message: "Signout was successful!"});
};

exports.requireSignin = expressJwt ({
    secret: process.env.JWT_SECRET,
    
    // solves the "Algorithms should be set" error
    algorithms: ["HS256"],
    
    // if the token is valid, expressjwt adds the verified user's id
    // in an auth key to the request object
    userProperty: "auth"
});