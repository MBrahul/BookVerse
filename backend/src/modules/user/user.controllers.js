import { verifyToken } from "../../config/jwt.js";
import { getUser, updateUserAddress } from "./user.services.js";
import { validateUser } from "./user.validations..js";

export const get = async (req, res, next) => {
    try {
        const {user} = req;

        validateUser(user);

        const result = await getUser(user?.id);
        // console.log(result);

        res.status(200).json({
            status: true,
            data: result
        })

    } catch (error) {
        next(error);
    }
}

export const updateAddress = async (req, res, next) => {
    try {
        const {user} = req;

        validateUser(user);
        
        const newAddress = req.body.address;

        if (!newAddress) {
            const error = new Error("Address field is Null");
            error.status = 400;
            throw error;
        }

        const result = await updateUserAddress(user?.id, newAddress);

        return res.status(200).json({
            status: true,
            msg: "Address updated successfully"
        })

    } catch (error) {
        next(error);
    }
}