import UserModel from "../Models/User.js";

export async function postLogin (req, res) {
  const { email, password } = req.body;
  const user = await UserModel.findOne({email});
  if (password === user?.password) {
    req.session.user = user;
    res.redirect("/dashboard");
  } else {
    res.redirect("/login");
    return;
  }
}

export function getLogin(req, res) {
  res.render('login');
}
