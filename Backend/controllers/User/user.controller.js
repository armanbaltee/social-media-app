const User = require("../../models/user/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const user = req.body;
    const password = user.password;
    const email = user.email;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(401).json({ message: "User Already exist!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let newUser = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: hashPassword,
    };

    const responseDB = await User.create(newUser);
    res.status(200).json({ data: responseDB, message: "Signup Successfully" });
  } catch (error) {
    res.status(401).json({message: "Something went wrong"})
  }
};

const login = async (req, res)=>{
    try {
        const { email, password } = req.body;
        const existUser = await User.findOne({ email })
        if(!existUser){
            return res.status(401).json({message: "User not found!"})
        }
        const isMatch = await bcrypt.compare(password, existUser.password);
        if(!isMatch){
            return res.status(401).json({message: "invalid email or password"});
        }
        const token = jwt.sign(
            {id: existUser._id},
            process.env.SECRET_KEY,
            {expiresIn: '1hr'}
        )

        res.status(200).json({
            message: "Login Successfull",
            token: token,
            user: {
                _id: existUser._id,
                name: existUser.name,
                email: existUser.email,
                phone: existUser.phone
            }
        })
    } catch (error) {
        res.status(401).json({message: "Login Error!"})
    }
}

module.exports = {
  signup,
  login,
};
