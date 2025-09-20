const UserModel = require('../models/userModel');

const registerUser = async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.json(error);

    }
};
const loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const user = await UserModel.findOne({ email: req.body.email })
        if (user && (await user.matchPassword(req.body.password))) {
            return res.json(user);
        } else {
            console.log(error);
            return res.json({ error: 'Invalid Password Or Email' });
        }
    } catch (error) {
        console.log(error);
        return res.json({ error: 'Invalid Password Or Email' });
    }
};
module.exports = { registerUser, loginUser };
