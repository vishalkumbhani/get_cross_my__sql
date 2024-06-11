const mysql = require('mysql');
const connection = require('../config/connection');

const InsertEvent = async (req, res) => {
    try {
        const data = req.body;
        if (!data.title || !data.eventdate || !data.description || !data.specilization || !data.isactive) {
            return res.status(400).json({
                status: false,
                message: "Please add all data"
            })
        }

        const image = req.file;
        if (!image) {
            return res.status(400).json({
                status: false,
                message: "Please add image"
            })
        }

        const title = data.title;
        const eventdate = data.eventdate;
        const description = data.description;
        const specilization = data.specilization;
        const isactive = data.isactive;
        const eventimage = image.filename;

        connection.query('INSERT INTO events (title,eventdate,description,specilization,isactive,eventimage) VALUES ( ?, ? ,? ,?, ?, ? ) ', [title, eventdate, description, specilization, isactive, eventimage], (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "please contact admin", err
                })
            }

            res.status(201).json({
                status: true,
                message: "Event inserted successfully"
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

const UpdateEvent = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from events where id = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "please contact admin"
                })
            }

            if (result.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: "Event not found"
                })
            }

            const data = req.body;
            const title = data.title;
            const eventdate = data.eventdate;
            const description = data.description;
            const specilization = data.specilization;
            const isactive = data.isactive;

            if (!req.file) {
                connection.query(`update events set title = '${title}' ,eventdate = '${eventdate}',description = '${description}',specilization = '${specilization}',isactive = '${isactive}' where id = ${id}`, (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            status: false,
                            message: "please contact admin", err
                        })
                    }

                    return res.status(200).json({
                        status: true,
                        message: "Event updated successfully"
                    })
                })
            }

            else {
                const eventimage = req.file.filename;
                connection.query(`update events set title = '${title}' ,eventdate = '${eventdate}',description = '${description}',specilization = '${specilization}',isactive = '${isactive}',eventimage = '${eventimage}' where id = ${id}`, (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            status: false,
                            message: "please contact admin"
                        })
                    }

                    return res.status(200).json({
                        status: true,
                        message: "Event updated successfully"
                    })
                })
            }
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const GetAllEvent = async (req, res) => {
    try {
        connection.query("select * from events ", (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            res.status(200).json({
                status: true,
                message: "All event found",
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

const GetSingleEvent = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from events where id = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (result.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: "Event not found"
                })
            }

            res.status(404).json({
                status: false,
                message: "Event found",
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

const DeleteEvent = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from events where id = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (result.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: "Event not found"
                })
            }

            connection.query(`delete from events where id = ${id}`, (err, result) => {
                res.status(404).json({
                    status: false,
                    message: "Event deleted successfully"
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

const ChangeEventStatus = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from events where id = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (result.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: "Event not found"
                })
            }

            if (result[0].isactive == 0) {
                connection.query(`update events set isactive = 1 where id = ${id} `, (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            status: false,
                            message: "Please contact admin"
                        })
                    }
                    res.status(200).json({
                        status: true,
                        message: "Event updated successfully"
                    })
                })
            }
            else {
                connection.query(`update events set isactive = 0 where id = ${id} `, (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            status: false,
                            message: "Please contact admin"
                        })
                    }
                    res.status(200).json({
                        status: true,
                        message: "Event updated successfully"
                    })
                })
            }
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
    InsertEvent,
    UpdateEvent,
    GetAllEvent,
    GetSingleEvent,
    DeleteEvent,
    ChangeEventStatus
}


