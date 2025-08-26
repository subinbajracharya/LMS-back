export const getUserDetail = (req, res) => {
    res.send({
        status: "success",
        message: "User Detail Found",
        user: req.user,
    });
};
