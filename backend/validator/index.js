exports.userSignupValidator = (req, res, next) => {
    // name should not be null and between 4-10 characters
    req.check("name", "Name is required!").notEmpty();

    // email should not be null, valid and normalized
    req.check("email", "Email should be between 7 to 32 characters!")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain the @ character")
    .isLength({
        min: 7,
        max: 32
    });

    // check password
    req.check("password", "Password is required!").notEmpty();
    req.check("password")
    .isLength({
        min: 8,
        max: 32
    })
    .withMessage("Password should be between 8 to 32 characters!")
    .matches(/\d/)
    .withMessage("Password must contain a number!");

    // check for errors
    const errors = req.validationErrors();
    // if there is an error, show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    
    // proceed to next middleware
    next();
}

exports.userSigninValidator = (req, res, next) => {
    req
        .check("email", "Email should be between 7 to 32 characters!")
        .matches(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        )
        .withMessage("Please type your valid email address!")
        .isLength({
            min: 7,
            max: 32
        });
    
    req.check("password", "Password is required!").notEmpty();
    req
        .check("password")
        .isLength({
            min: 8,
            max: 32
        })
        .withMessage('Your password is invalid!');
    
        const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    
    next();
};