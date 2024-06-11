const connection = require("../config/connection");

const InsertCategory = async (req, res) => {
    try {
        const data = req.body
        if (!data.categoryname) {
            return res.status(400).json({
                status: false,
                message: "Please add all data"
            })
        }

        const file = req.file;
        if (!file) {
            return res.status(400).json({
                status: false,
                message: "Please add image"
            })
        }

        var catname = data.categoryname;
        var imagename = file.filename;

        connection.query('INSERT INTO helpdesks (categoryname, categoryimage) VALUES (?, ?)', [catname, imagename], (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "please contact admin", err
                })
            }

            res.status(201).json({
                status: true,
                message: "Category inserted successfully"
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

const UpdateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from helpdesks where id = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (result.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: "Category not found"
                })
            }

            if (!req.file) {
                const catname = req.body.categoryname;
                connection.query(`update helpdesks set categoryname = '${catname}' where id = ${id}`, (err, result) => {

                    if (err) {
                        return res.status(400).json({
                            status: false,
                            message: "Please contact admin"
                        })
                    }

                    return res.status(200).json({
                        status: true,
                        message: "Category updated successfully"
                    })
                })
            }

            else {
                const imagename = req.file.filename;
                connection.query(`update helpdesks set categoryname = '${catname}' , categoryimage = '${imagename}' where id = ${id}`, (err, result) => {

                    if (err) {
                        return res.status(400).json({
                            status: false,
                            message: "Please contact admin"
                        })
                    }

                    res.status(200).json({
                        status: true,
                        message: "Category updated successfully"
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

const GetAllCategory = async (req, res) => {
    try {
        connection.query("select * from helpdesks ", (err, result) => {
            if (err) {
                res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            res.status(200).json({
                status: true,
                message: "All category found",
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

const GetSingleCategory = async (req, res) => {
    try {

        const id = req.params.id;
        connection.query(`select * from helpdesks where id = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (result.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: "Category not found"
                })
            }

            res.status(404).json({
                status: true,
                message: "Category found",
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

const DeleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from helpdesks where id = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (result.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: "Category not found"
                })
            }

            connection.query(`delete from helpdesks where id = ${id}`, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: "Please contact admin"
                    })
                }

                res.status(200).json({
                    status: true,
                    message: "Category deleted successfully"
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
    InsertCategory,
    UpdateCategory,
    GetAllCategory,
    GetSingleCategory,
    DeleteCategory
}

