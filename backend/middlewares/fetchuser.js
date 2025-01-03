const jwt = require('jsonwebtoken');

const fetchUser = async(req,res,next)=>{
    const token = req.header('auth-token');
    //if token not found
    if(!token){
        return res.status(400).json({
            status:false,
            msg:"authenticate with correct credentails"
        })
    }

    // console.log(token)
    try{
        jwt.verify(token,process.env.JWT_KEY,(err,data)=>{
            if(err){
                return res.status(400).json({
                    status:false,
                    msg:"authenticate with correct credentails"
               })
            }
            else{
                req.user = data;
                next();
            }
        });
       
    } catch (error) {
        return res.status(500).json({
            status:false,
            msg:"Internal server error"
        })
    }
}

module.exports = fetchUser;