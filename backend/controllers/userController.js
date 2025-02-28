const User = require("./../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
const registerUser = async(req,res) => {
    const {username,email,password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).json(newUser);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

//Login
const loginUser = async(req,res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({ error: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ msg:"login successfull",token });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

module.exports = { registerUser, loginUser };