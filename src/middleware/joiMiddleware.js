import joi from "joi";

const joiMiddleware = (schema, req, res, next) => {
    // Destructure the schema and validate the request body
    const { error } = schema.validate(req.body);
    error
        ? res.status(400).json({
            status: "error",
            message: error.message,
        })
        : next();
};