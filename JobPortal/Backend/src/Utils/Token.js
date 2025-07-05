import jwt from 'jsonwebtoken';

export const getToken = (userId, res) => {
    if (!userId) {
        console.error("Error: userId is undefined in getToken function.");
        return;
    }

    
    const token = jwt.sign({ userId }, process.env.JWT_SECRETE, { 
        expiresIn: '7d',
    });

    
    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // sameSite : "strict",
        sameSite : process.env.NODE_ENV === "production" ? "None" : "Lax", 
        secure: process.env.NODE_ENV === "production",
    });

    //console.log("Generated Token:", token);
    return token;
};
