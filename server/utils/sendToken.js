export const sendToken=(user,statusCode,message,res)=>{
    const token = user.generateToken();
    const days = parseInt(process.env.COOKIE_EXPIRE) || 3;
    res.status(statusCode).cookie("token",token,{
        expires:new Date(
            Date.now()+days*24*60*60*1000
        ),
        httpOnly:true,
    })
    .json({
        success:true,
        user,
        message,
        token
    });

}