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

export const loginValidation = (req, res, next) => {
    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).required(),
    });
    joiMiddleware(loginSchema, req, res, next);
}

export const createBookValidation = (req, res, next) => {
    const createBookSchema = joi.object({
        title: joi.string().required(),
        author: joi.string().required(),
        isbn: joi.string().required(),
        publishedYear: joi.date().required(),
        genre: joi.string().required(),
        thumbnail: joi.string().uri().required(),
        description: joi.string().optional(),
    });
    joiMiddleware(createBookSchema, req, res, next);
}