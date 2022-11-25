export default function (req, res, next) {
    if (!req.session || !req.session?.user) {
        return res.redirect('/login');
    }
    next();
}
