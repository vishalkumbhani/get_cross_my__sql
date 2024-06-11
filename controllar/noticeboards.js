const connection = require("../config/connection");

const InsertNoticeBoards = async (req, res) => {
    try {
        const data = req.body;
        if (!data.title || !data.description) {
            return res.status(400).json({
                status: false,
                message: "Please add all data"
            })
        }

        connection.query("insert into noticeboards set ? ", data, (err, result, fields) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: err
                });
            }

            res.status(201).json({
                status: true,
                message: "Notice inserted successfully"
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

const UpadateNoticeBoards = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from noticeboards where id = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: err
                })
            }

            if (result.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: "Notice not Found"
                })
            }

            const title = req.body.title;
            const description = req.body.description;

            connection.query(`update noticeboards set title = '${title}' , description = '${description}' where id = ${id}`, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: err
                    })
                }

                res.status(200).json({
                    status: true,
                    message: "Notice Updated successfully",
                    data: result
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

const GetAlltNoticeBoards = async (req, res) => {
    try {
        connection.query("select * from noticeboards", (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: err
                });
            }

            res.status(200).json({
                status: true,
                message: "All notice found",
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

const GetSingletNoticeBoards = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from noticeboards where id = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: err
                });
            }

            if (result.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: "Notice not found"
                })
            }

            res.status(200).json({
                status: true,
                message: "Notice found",
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

const DeletetNoticeBoards = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from noticeboards where id = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: err
                });
            }

            // res.send(result);

            if (result.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: "Notice not found"
                });
            }

            connection.query(`delete from noticeboards where id = ${id} `, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: err
                    })
                }

                res.status(200).json({
                    status: true,
                    message: "Notice deleted successfully"
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

module.exports = {
    InsertNoticeBoards,
    UpadateNoticeBoards,
    GetAlltNoticeBoards,
    GetSingletNoticeBoards,
    DeletetNoticeBoards
}

