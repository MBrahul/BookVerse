
const verifyRole = (role) => {

    return async (req, res, next) => {
        try {
            const user = req.user;
            if (!user) {
                return res.status(400).json({
                    status: false,
                    msg: "authenticate with correct credentails"
                })
            }

            if (user.role !== role) {
                return res.status(400).json({
                    status: false,
                    msg: `authenticate with ${user.role === 'user' ? 'Admin' : 'Customer'} credentails`
                })
            }
            else next();

        } catch (error) {
            return res.status(500).json({
                status: false,
                msg: "Internal server error"
            })
        }
    }   
}

module.exports = verifyRole;