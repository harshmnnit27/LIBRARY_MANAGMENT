export const sendToken = (user, statusCode, message, res) => {
    const token = user.generateToken();
    const days = parseInt(process.env.COOKIE_EXPIRE) || 3;

    const isProd = process.env.NODE_ENV === "production";
    const cookieOptions = {
        expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: isProd ? "none" : "lax",
        secure: !!isProd,
    };

    // Allow optionally setting a cookie domain in production (useful for subdomain setups)
    if (process.env.COOKIE_DOMAIN) {
        cookieOptions.domain = process.env.COOKIE_DOMAIN;
    }

    res
        .status(statusCode)
        .cookie("token", token, cookieOptions)
        .json({
            success: true,
            user,
            message,
            token,
        });
};