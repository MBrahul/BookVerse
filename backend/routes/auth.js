const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middlewares/fetchuser')
const { body, validationResult } = require("express-validator");

// sign up
router.post('/sign-up', [body('username', 'Username must be 3 letters').isLength({ min: 3 }), body('email', 'Enter valid email').isEmail(), body('password', 'password must be atleast 5 letters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // if there are error return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                msg: errors.array()
            });
        }

        // check if user already exits with same email

        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                status: false,
                msg: "email already registered"
            })
        }

        // check if username already taken

        user = await User.findOne({ username: username });
        if (user) {
            return res.status(400).json({
                status: false,
                msg: "Username already taken"
            })
        }


        // create new user

        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(password, salt);

        await User.create({
            username, email, password: securedPassword, address
        }).then((user) => {

            // create jwt token

            const data = {
                user: {
                    id: user._id,
                    role: user.role
                }
            };

            const token = jwt.sign(data, process.env.JWT_KEY);


            return res.json({
                status: true,
                token: token,
                data: user
            })
        });

    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
});



// sign in
router.post('/sign-in', [body('username', 'Username must be 3 letters').isLength({ min: 3 }), body('password', 'password must be atleast 5 letters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { username, password } = req.body;

        // if there are error return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                msg: errors.array()
            });
        }

        // check if user exists or not

        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                status: false,
                msg: "Invalid credentials"
            })
        }

        await bcrypt.compare(password, user.password, (err, data) => {
            if (data) {

                const data = {
                    id: user._id,
                    role: user.role
                };

                const token = jwt.sign(data, process.env.JWT_KEY);

                return res.status(200).json({
                    status: true,
                    token: token,
                    data: user
                })
            }
            else {
                return res.status(400).json({
                    status: false,
                    msg: "Invalid credentials"
                })
            }
        })

    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
});



// get user-info

router.get('/get-user-info', fetchUser, async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id).select('-password');
        // console.log(user)
        res.json({
            status: true,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
})



//update address

router.put('/update-address', fetchUser, async (req, res) => {
    try {
        const id = req.user.id;
        const newAddress = req.body.address;
        // console.log(newAddress)
        await User.findByIdAndUpdate(id, { address: newAddress });
        return res.status(200).json({
            status: true,
            msg:"Address updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
})


module.exports = router;