const router = require('express').Router();
const User = require('../models/user');
const Order = require('../models/order');
const fetchUser = require('../middlewares/fetchuser');
const { body, validationResult } = require("express-validator");

// place-order
router.post('/place-order', fetchUser, async (req, res) => {
    try {

        const id = req.user.id;

        const { orders } = req.body;
        for (const order of orders) {
            // console.log(order._id)
            const newOrder = new Order({ user: id, book: order._id });
            const data = await newOrder.save();
            //add to user's orders
            await User.findByIdAndUpdate(id, { $push: { orders: data._id } });
            // remove from user's cart
            await User.findByIdAndUpdate(id, { $pull: { cart: order._id } });
        }
        return res.json({
            status: true,
            msg: "Orders placed successfully"
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            msg: "Internal server error",
            error: error
        })
    }
});


//get order histry of a particular user

// router.post('/get-order-history',fetchUser,async(req,res)=>{
//     try {
//         const id = req.user.id;
//         const 
//     } catch (error) {
//         res.status(500).json({
//             status:false,
//             msg:"Internal server error",
//             error:error
//         })
//     }
// })




// get-all-orders - admin;

router.get('/get-all-orders', fetchUser, async (req, res) => {
    try {

        const user = req.user;
        // console.log(user);
        if (user.role == "user") {
            return res.status(400).json({
                status: false,
                msg: "Permission required"
            })
        }
        else {
            const data = await Order.find().populate(["book", { path: "user", select: ["_id", "username", "email", "address"] }]).sort({ createdAt: -1 });
            return res.json({
                status: true,
                data: data
            })
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            msg: "Internal server error",
            error: error
        })
    }
})


//update-order-status:admin

router.put('/update-order-status/:id', fetchUser, async (req, res) => {
    try {
        const user = req.user;
        // console.log(user);
        if (user.role == "user") {
            return res.status(400).json({
                status: false,
                msg: "Permission required"
            })
        }
        else {
            const { id } = req.params;
            const { status } = req.body;
            // console.log(status)
            const data = await Order.findByIdAndUpdate(id, { status: status });
            return res.json({
                status: true,
            })
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            msg: "Internal server error",
            error: error
        })
    }
})




module.exports = router;