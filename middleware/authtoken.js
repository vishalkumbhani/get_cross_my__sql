const jwt = require('jsonwebtoken');
const connection = require('../config/connection');

const authtoken = async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, 'india', async function (err, tokenresult) {

        if (err) {
            return res.status(400).json({
                status: false,
                message: "Token is invalid"
            })
        }

        connection.query(`select * from users where token = '${token}'`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (result.length <= 0) {
                return res.status(400).json({
                    status: false,
                    message: "Token expire"
                })
            }

            connection.query(`select * from users where id = ${tokenresult.id}`, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: "Please contact admin"
                    })
                }

                const myuser = result[0];
                req.user = myuser;
                next();
            })
        })
    })
}
module.exports = authtoken;
