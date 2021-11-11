//takes action by existence of user
module.exports = (roles) => {
    return (req, res, next) => {
        const userRole = req.body.role;

        if (roles.includes(userRole)) {
            next();
        } else {
            res.status(401).send('Yor can\'t do it');
        }
    }
}