import { createUser, getUser, updateUser } from "../models/users/userModel.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config/config.js";
import { sendEmailVerificationTemplate } from "../utils/emailProcessor.js";

export const registerUser = async (req, res) => {
    try {
        // register user logic
        // {username,email,password}
        let userObject = req.body;
        // console.log(userObject)

        // encrypt the password
        let salt = bcrypt.genSaltSync(parseInt(config.salt) || 10);
        userObject.password = bcrypt.hashSync(userObject.password, salt);

        let newUser = await createUser(userObject);
        if (newUser._id) {
            // Create unique code
            // Update user table with unique code
            const emailVerificationToken = uuidv4()
            const result = await updateUser(newUser._id, { emailVerificationToken })

            // Send email verification link
            const url = process.env.ROOT_DOMAIN + `/verify-email?t=${emailVerificationToken}&email=${newUser.email}`

            sendEmailVerificationTemplate({
                to: newUser.email,
                url,
                userName: newUser.username
            })
        }

        return res.status(201).json({
            status: true,
            message: "User successfully created!",
        });
    } catch (err) {
        console.log(err.message);

        if (err.message.includes("E11000")) {
            return res.status(400).json({
                status: false,
                message: "Email already used!",
            });
        } else {
            return res.status(500).json({
                status: false,
                message: "SERVER ERROR",
            });
        }
    }
};

export const loginUser = async (req, res) => {
    try {
        // login user
        let { email, password } = req.body;

        // fetch user from database
        let user = await getUser({ email: email });
        if (!user.status && !user.isEmailVerified) {
            return res.status(401).json({
                status: false,
                message: "Please verify your email first!"
            })
        }

        if (user) {
            // user found
            // user.password -> db password
            // compare password with user.password
            let passwordMatch = bcrypt.compareSync(password, user.password);
            if (passwordMatch) {
                user.password = "";

                let payload = {
                    email: user.email,
                };

                let accessToken = jwt.sign(payload, config.jwt.secret, {
                    expiresIn: process.env.JWT_EXPIRESIN,
                });

                return res.status(200).json({
                    status: true,
                    message: "Login Successful",
                    user,
                    accessToken,
                });
            } else {
                return res.status(401).json({
                    status: false,
                    message: "User not authenticated!",
                });
            }
        } else {
            // user not found
            return res.status(401).json({
                status: false,
                message: "Credentials Mismatch!",
            });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            status: false,
            message: "Server Error!",
        });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        let token = req.query.t
        let email = req.query.email

        let user = await getUser({ email: email })

        if (user) {
            if (user.isEmailVerified) {
                return res.json({
                    status: false,
                    message: "Email already verified!"
                })
            }

            if (user.emailVerificationToken === token) {
                user.isEmailVerified = true
                user.emailVerificationToken = "null"
                await user.save()

                return res.json({
                    status: true,
                    message: "Email Verified!"
                })
            } else {
                return res.json({
                    status: false,
                    message: "Invalid token!"
                })
            }
        } else {
            return res.json({
                status: false,
                message: "User not found!"
            })
        }
    } catch (error) {
        return res.json({
            status: false,
            message: "Server Error!"
        })
    }
}

export const resendToken = async (req, res) => {
    try {
        let email = req.query.email
        let user = await getUser({ email: email })
        if (user) {
            user.emailVerificationToken = uuidv4(32)
            user.isEmailVerified = false
            await user.save()
            const url = process.env.ROOT_DOMAIN + `/verify-email?t=${user.emailVerificationToken}&email=${user.email}`

            sendEmailVerificationTemplate({
                to: user.email,
                userName: user.userName,
                url: url
            })

            return res.json({
                status: true,
                message: "Email Verification Token Resent!"
            })
        } else {
            return res.json({
                status: false,
                message: "User not found!"
            })
        }
    } catch (error) {
        return res.json({
            status: false,
            message: "Server Error!"
        })
    }
}

export const forgotPassword = async (req, res) => {
    try {
        let email = req.body.email
        let user = await getUser({ email: email })
        if (user) {
            let token = await generateToken(user._id)
            let link = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email
                                                        = ${email}`
            await sendEmail({
                to: email,
                subject: "Reset Password",
                message: link
            })
            return res.json({
                status: true,
                message: "Password Reset Link Sent!"
            })
        } else {
            return res.json({
                status: false,
                message: "User not found!"
            })
        }
    } catch (error) {
        return res.json({
            status: false,
            message: "Server Error!"
        })
    }
}

export const resetPassword = async (req, res) => {
    try {
        let token = req.query.token
        let email = req.query.email
        let password = req.body.password
        let confirmPassword = req.body.confirmPassword
        if (password === confirmPassword) {
            let user = await getUser({ email: email })
            if (user) {
                let isValidToken = await verifyToken(token, user._id)
                if (isValidToken) {
                    let hashedPassword = await bcrypt.hash(password, 10)
                    await updateUser({ _id: user._id }, { password: hashedPassword })
                    return res.json({
                        status: true,
                        message: "Password Reset Successfully!"
                    })
                } else {
                    return res.json({
                        status: false,
                        message: "Invalid Token!"
                    })
                }
            } else {
                return res.json({
                    status: false,
                    message: "User not found!"
                })
            }
        } else {
            return res.json({
                status: false,
                message: "Password and Confirm Password do not match!"
            })
        }
    } catch (error) {
        return res.json({
            status: false,
            message: "Server Error!"
        })
    }
}