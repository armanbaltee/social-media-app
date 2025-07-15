const jwt = require("jsonwebtoken")

const signup = (req, res, next)=>{
    const { name, email, phone, password } = req.body

    if(!name || !email || !phone || !password){
        return res.status(401).json({message: "All field are required!"});
    }
    next();
}

const login = (req, res, next) => {
    const { email, password } = req.body;
    console.log("here")

    if (!email || !password) {
        return res.status(400).send("Required all fields");
    }
    next();
};


const verifyToken = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({message: "No token provided authorization denied..."})
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: "invalid or token expired..."})
    }
}

module.exports = {
    login,
    signup,
    verifyToken
}