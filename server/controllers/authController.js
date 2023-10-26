const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbo = require("../db/conn");
const asyncHandler = require('express-async-handler');

const ObjectId = require("mongodb").ObjectId;

loginUser = async (req, res) => {
    let loginDetails = req.body;
    let db_connect = dbo.getDb();

    db_connect.collection("users").findOne({name: loginDetails.name}).then((userData) => {
        if(userData){
            bcrypt.compare(loginDetails.password,userData.password).then((result) => {
                if(result){
                    const accessToken = jwt.sign(
                        {
                            "UserInfo": {
                              userId: userData._id
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '10s' }
                    );
                    const refreshToken = jwt.sign(
                        {
                          userId: userData._id
                        },
                        process.env.REFRESH_TOKEN_SECRET,
                        {expiresIn: '1w'} // 1 week
                    );
                    res.cookie("jwt", refreshToken, {
                        // httpOnly: true, // Only accessed by http (client-side scripts cannot access)
                        // secure: true,
                        // sameSite: 'None',
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    });
                    res.json({ name: userData.name, accessToken, userId: userData._id });
                }else{
                    return res.status(401).send("Invalid login details!");
                }
            })
        }else{
            return res.status(401).send("Invalid login details!");
        }
    }).catch((error) => {
        return res.status(401).send("Invalid login details!");
    });
}

refreshToken = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401).json({message: "Unauthorized"});

    const refreshToken = cookies.jwt;
    let db_connect = dbo.getDb();
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({message: "Forbidden"});
            const userData = await db_connect.collection("users").findOne({_id: new ObjectId(decoded.userId)});
            if(!userData) return res.status(401).json({message: "Unauthorized"});
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                      userId: userData._id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '10s'} // 15 minutes
            );
            res.json({ accessToken : accessToken, user: {name: userData.name}})
        })
    );
}  

logoutUser = (req, res) => {
    const cookies = req.cookies;
    if (!cookies.jwt) return res.sendStatus(204);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true});
    res.json({ message: 'Cookie cleared'});
}


module.exports = {
    loginUser,
    refreshToken,
    logoutUser,
}
