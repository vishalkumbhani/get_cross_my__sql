const mysql = require('mysql');
const bcrypt = require('bcrypt');
const connection = require('../config/connection');
const jwt = require('jsonwebtoken');

const InsertUser = async (req, res) => {
    try {
        var data = req.body;
        if (!data.name || !data.email || !data.mobilenumber || !data.gender || !data.work || !data.birthdate || !data.password) {
            return res.status(400).json({
                status: false,
                message: "Please add all data"
            })
        }

        connection.query(`select * from users where email = '${data.email}'`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (result.length >= 1) {
                return res.status(400).json({
                    status: false,
                    message: "Email already exists"
                })
            }
        })

        connection.query(`select * from users where mobilenumber = '${data.mobilenumber}'`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (result.length >= 1) {
                return res.status(400).json({
                    status: false,
                    message: "Mobilenumber already exists"
                })
            }
        })

        const newpassword = await bcrypt.hash(data.password, 10)
        // const name = data.name;
        // const email = data.email;
        // const mobilenumber = data.mobilenumber;
        // const gender = data.gender;
        // const work = data.work;
        // const birthdate = data.birthdate;
        const { name, email, mobilenumber, gender, work, birthdate } = data;
        const password = newpassword;

        //array destructuring

        connection.query('INSERT INTO users (name,email,mobilenumber,gender,work,birthdate,password)VALUES ( ?, ? ,? ,?, ?, ? ,? ) ', [name, email, mobilenumber, gender, work, birthdate, password], (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin", err
                })
            }
            res.status(400).json({
                status: true,
                message: "User inserted"
            })
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const UpdateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        connection.query(`select * from users where id = ${id}`, async (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "please contact admin"
                })
            }

            if (result.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                })
            }

            const newpassword = await bcrypt.hash(data.password, 10)
            const name = data.name;
            const email = data.email;
            const mobilenumber = data.mobilenumber;
            const gender = data.gender;
            const work = data.work;
            const birthdate = data.birthdate;
            const password = newpassword;

            connection.query(`update users set name = '${name}',email = '${email}',mobilenumber = '${mobilenumber}',gender = '${gender}',work = '${work}',birthdate = '${birthdate}',password = '${password}' where id = ${id}`, (err, result) => {

                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: "please contact admin"
                    })
                }

                res.status(200).json({
                    status: true,
                    message: "User updated successfully"
                })
            })
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const GetAllUser = async (req, res) => {
    try {
        connection.query("select * from users", (err, result) => {
            if (err) {
                res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }
            res.status(400).json({
                status: true,
                message: "All user found",
                data: result
            })
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const GetSingleUser = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from users where id = ${id}`, async (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "please contact admin"
                })
            }

            if (result.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                })
            }

            res.status(400).json({
                status: true,
                message: "User found",
                data: result[0]
            })
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const DeleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from users where id = ${id}`, async (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "please contact admin"
                })
            }

            if (result.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                })
            }

            connection.query(`delete from users where id = ${id} where id = ${id}`, (err, result) => {
                res.status(400).json({
                    status: true,
                    message: "User deleted successfully",
                    data: result[0]
                })
            })
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const ChangePasswordOfUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        connection.query(`select * from users where id = ${id}`, async (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "please contact admin"
                })
            }

            if (result.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                })
            }

            const user = result[0];
            console.log(user.password);
            const matchpassword = await bcrypt.compare(data.oldpassword, user.password)
            if (!matchpassword) {
                return res.status(400).json({
                    status: false,
                    message: "Password not matched"
                })
            }

            const password = await bcrypt.hash(data.newpassword, 10)

            connection.query(`update users set password = '${password}' where id = ${id}`, (err, result) => {

                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: "please contact admin"
                    })
                }

                res.status(200).json({
                    status: true,
                    message: "Password updated successfully"
                })
            })
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const ChangePasswordOfUserByToken = async (req, res) => {
    try {
        const user = req.user
        const data = req.body;

        const matchpassword = await bcrypt.compare(data.oldpassword, user.password)
        if (!matchpassword) {
            return res.status(400).json({
                status: false,
                message: "Password not matched"
            })
        }

        const password = await bcrypt.hash(data.newpassword, 10)

        connection.query(`update users set password = '${password}' where id = ${user.id}`, (err, result) => {

            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "please contact admin"
                })
            }

            res.status(200).json({
                status: true,
                message: "Password updated successfully"
            })
        })
    }


    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const RegisterUser = async (req, res) => {
    try {
        var data = req.body;
        if (!data.name || !data.email || !data.mobilenumber || !data.gender || !data.work || !data.birthdate || !data.password) {
            return res.status(400).json({
                status: false,
                message: "Please add all data"
            })
        }

        connection.query(`select * from users where email = '${data.email}'`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin", err
                })
            }

            if (result.length >= 1) {
                return res.status(400).json({
                    status: false,
                    message: "Email already exists"
                })
            }
        })

        connection.query(`select * from users where mobilenumber = '${data.mobilenumber}'`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (result.length >= 1) {
                return res.status(400).json({
                    status: false,
                    message: "Mobilenumber already exists"
                })
            }
        })

        const newpassword = await bcrypt.hash(data.password, 10)
        const name = data.name;
        const email = data.email;
        const mobilenumber = data.mobilenumber;
        const gender = data.gender;
        const work = data.work;
        const birthdate = data.birthdate;
        const password = newpassword;

        connection.query('INSERT INTO users (name,email,mobilenumber,gender,work,birthdate,password)VALUES ( ?, ? ,? ,?, ?, ? ,? ) ', [name, email, mobilenumber, gender, work, birthdate, password], (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin", err
                })
            }
            res.status(400).json({
                status: true,
                message: "User registered successfully"
            })
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const LoginUser = async (req, res) => {
    try {
        const data = req.body;
        connection.query(`select * from users where email = '${data.email}'`, async (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (result.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                })
            }

            const user = result[0];
            const password = await bcrypt.compare(data.password, user.password);
            if (!password) {
                return res.status(400).json({
                    status: false,
                    message: "Password not matched"
                })
            }

            var token = jwt.sign({ id: user.id }, 'india', { expiresIn: '1h' });
           
            connection.query(`update users set token = '${token}' where email = '${user.email}'`, (err, result) => {
                if (err) {
                    res.status(400).json({
                        status: false,
                        message: "Please contact admin"
                    })
                }


                user.password = "null";
                user.token = "null";

                res.status(200).json({
                    status: true,
                    message: "Login successfully",
                    data: user,
                    token: token
                })
            })
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const GetUserProfileBYAuthrozation = async (req, res) => {
    try {
        const user = req.user

        user.password = null;
        user.token = null;

        res.status(200).json({
            status: true,
            data: user
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const SearchUsers = async (req, res) => {
    try {
        // 'j%' -- start from j
        connection.query(`select * from users where name like '%a%' `, (err, result) => {
            if (err) {
                res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            const mydata = [];
            for (const obj of result) {
                obj.password = null;
                obj.token = null;
                obj.field = "aaa"
                mydata.push(obj);
            }

            // for (const obj of result) {
            //     const {name,email} = obj;
            //     mydata.push({name,email});
            // }

            res.status(200).json({
                status: true,
                message: "All data found",
                data: mydata
            })
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

module.exports = {
    InsertUser,
    UpdateUser,
    GetAllUser,
    GetSingleUser,
    DeleteUser,
    ChangePasswordOfUserById,
    ChangePasswordOfUserByToken,
    RegisterUser,
    LoginUser,
    GetUserProfileBYAuthrozation,
    SearchUsers
}

