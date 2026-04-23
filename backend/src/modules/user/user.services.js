import User from "../../../models/user.js";

export const getUser = async (id) => {
    const user = await User.findById(id).select('-password');
    return user;
}

export const updateUserAddress = async (id,newAddress) => {

    await User.findByIdAndUpdate(id, { address: newAddress });
    
}