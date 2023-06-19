const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

//Registering Admin
module.exports.register = async (req, res) => {
  try {
    if (req.password != req.passwordConfirm) {
      return res.status(400).json({
        status: "failure",
        message: "Please enter password correctly",
      });
    }

    // Finding the admin by username
    const adminAlreadyExists = await Admin.findOne({
      email: req.body.email,
    });

    // If already exists returning Asking the admin to login
    if (adminAlreadyExists) {
      return res.status(400).json({
        status: "failure",
        message: "Admin Already Register, Please log in",
      });
    }

    //if admin not exsits then create one
    const admin = await Admin.create(req.body);

    // if creating of admin failed returning
    if (!admin) {
      return res.status(500).json({
        status: "failure",
        message: "Something went wrong",
      });
    }

    // admin creation successfull
    return res.status(200).json({
      status: "Success",
      message: "You are registered",
    });
  } catch (err) {
    // Any error occoured during creating admin will handeled here
    console.log(err);

    return res.status(500).json({
      status: "failure",
      message: err.message,
    });
  }
};

// Login Admin
module.exports.createSession = async (req, res) => {
  try {
    //Finding if the admin exists
    let admin = await Admin.findOne({
      email: req.body.email,
    });

    // if their is no admin with that user name or Password incorrect then return a message invalid password or Username
    if (
      !admin ||
      !(await admin.correctPassword(req.body.password, admin.password))
    ) {
      return res.status(422).json({
        status: "failure",
        message: "Invalid Username/Password",
      });
    }

    //Else create JWT and send
    return res.status(200).json({
      status: "Success",
      message: "Sign in successful, Here is your token,please keep it safe",
      data: {
        token: jwt.sign(admin.toJSON(), "ThisIsMySecret", {
          expiresIn: "1d",
        }),
      },
    });
  } catch (err) {
    // Any error occoured during loging in admin will handeled here

    console.log(err);
    return res.json(500, {
      message: err.message,
    });
  }
};
