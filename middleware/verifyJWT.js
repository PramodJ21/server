const jwt = require('jsonwebtoken')


const verifyJWT = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    if(!authHeader) return res.sendStatus(401)
    console.log(authHeader)
    const toker = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) =>{
            if(err) return res.sendStatus(403) //invalid tokern
            req.user = decoded.username
            next()
        }
    )
}

module.exports = verifyJWT