const bcrypt = require('bcrypt');
const User = require('../../models/user_models');

const registration = async (req, res) => {
    try {
        const { name, email, password, role, googleImage } = req.body;
        console.log(name, email, password);

        const useremail = await User.findOne({ email });
        if (useremail) {
            return res.status(400).json({ message: 'Eamil alreay uses. Try again with new email' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        let image = null;
        if (req.file) {
            image = req.file.filename;
        }
        const newUser = await new User({
            email,
            password: hashedPassword,
            name,
            role,
            image: image ? image : googleImage,
        }).save();
        res.status(200).json({ message: 'successfully created', newUser });
    } catch (error) {
        console.log(error?.message);
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: 'email didn"t match' });
        }
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.json({ message: 'password didn"t match' });
            }
        }
        res.json({
            email: user.email,
            role: user.role,
            login: true,
            image: user.image,
            name: user.name,
        })
    } catch (error) {
        console.log(error);
    }
}


const googleLogin = async (req, res) => {
    try {
        const { name, email, password, role, image } = req.body;

        const useremail = await User.findOne({ email });
        if (useremail) {
            console.log(useremail);
            return res.json(useremail);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({
            email,
            password: hashedPassword,
            name,
            role,
            image,
        }).save();
        console.log(newUser);
        res.status(200).json(newUser);
    } catch (error) {
        console.log(error?.message);
    }
}

module.exports = { registration, login, googleLogin }