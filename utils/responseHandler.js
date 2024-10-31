exports.success = (res, statusCode, data, message = "Success") => {
    res.status(statusCode).json({ status: "success", message, data });
};

exports.error = (res, error) => {
    const statusCode = error.status || 500;
    const message = error.message || "Internal Server Error";
    res.status(statusCode).json({ status: "error", message });
};
