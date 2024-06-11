const mysql = require('mysql');
const connection = require('../config/connection');

const InsertContacts = async (req, res) => {
    try {
        const data = req.body;
        if (!data.categoryid || !data.name || !data.contact) {
            return res.status(400).json({
                status: false,
                message: "Please add all data"
            })
        }

        connection.query(`select * from contacts where contact = '${data.contact}'`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (result.length >= 1) {
                return res.status(404).json({
                    status: false,
                    message: "Mobilenumber already exists"
                })
            }

            const categoryid = data.categoryid;
            const name = data.name;
            const contact = data.contact;

            connection.query(`INSERT INTO contacts (categoryid,name,contact) VALUES (?,?,?) `, [categoryid, name, contact], (err, result) => {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: "Please contact admin"
                    })
                }

                return res.status(201).json({
                    status: true,
                    message: "Contact inserted successfully"
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

const UpdateContacts = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        connection.query(`select * from contacts where id = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (result.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: "Contact not found"
                })
            }

            const categoryid = data.categoryid;
            const name = data.name;
            const contact = data.contact;

            connection.query(`update contacts set categoryid = '${categoryid}',name = '${name}',contact = '${contact}' where id = ${id}`, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: "Please contact admin"
                    })
                }

                res.status(200).json({
                    status: false,
                    message: "Contact updated successfully"
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

const GetAllContacts = async (req, res) => {
    try {
        connection.query('select * from contacts ', (err, result) => {

            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            return res.status(200).json({
                status: true,
                message: "All contact found",
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

const GetSingleContacts = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from contacts where id = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (result.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: "Contact not found"
                })
            }

            connection.query(`select * from contacts where id = ${id} `, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: "Please contact admin"
                    })
                }

                return res.status(200).json({
                    status: true,
                    message: "Contact found",
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

const DeleteContacts = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from contacts where id = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (result.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: "Contact not found"
                })
            }

            connection.query(`delete from contacts where id = ${id} `, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: "Please contact admin"
                    })
                }

                return res.status(200).json({
                    status: true,
                    message: "Contact deleted successfully",
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

const GetAllContactsByCategory = async (req, res) => {
    try {
        connection.query(`select h.categoryname , c.* from helpdesks as h left join contacts as c on c.categoryid = h.id where h.categoryname = 'plumber'`, (err, result) => {
            if (err) {
                res.status(400).json({
                    status: false,
                    message: "Please contact admin", err
                })
            }
            res.status(200).json({
                status: true,
                message: "All data found",
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

const SearchContacts = async (req, res) => {
    try {
        // '%j%'
        connection.query(`select * from contacts where name like 'j%' `, (err, result) => {
            if (err) {
                res.status(400).json({
                    status: false,
                    message: "Please contact admin", err
                })
            }
            res.status(200).json({
                status: true,
                message: "All data found",
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

module.exports = {
    InsertContacts,
    UpdateContacts,
    GetAllContacts,
    GetSingleContacts,
    DeleteContacts,
    GetAllContactsByCategory,
    SearchContacts
}

// connection.query(`select h.categoryname , c.* from helpdesks as h left join contacts as c on c.categoryid=h.id where c.name like '%a%'`, (err, result) => {