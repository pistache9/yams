import UserModel from "../Models/User.js";

export function getHome(req, res) {
  res.render("home");
}

export async function postHome(req, res) {

  const { firstName, lastName, email, password } = req.body;
  const userData = { firstName, lastName, email, password };
  const errorMessagesList = [];

  checkMissingFieldErrors(userData, errorMessagesList);
  checkPasswordConfirmError(password, req.body.password_confirm, errorMessagesList);

  if (errorMessagesList.length === 0) {
    const result = await checkIfMailAllreadyExists(email);
    if (result?.email === email) {
      res.render("home", { errors: ["Mail déjà utilisé"], userData })
      return
    }
    const user = await createUser(userData);
    req.session.email = user.email;
    res.render("login", {user: userData});
    return;
  } else {
    res.render("home", { errors: errorMessagesList, userData })
    return;
  }

  async function checkIfMailAllreadyExists(email) {
      return await UserModel.findOne({email: email});
  }

  async function createUser(user) {
      return await UserModel.create({firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password});
  }

  function checkMissingFieldErrors(user, errors) {
    for (const field of getMissingFields(user)) {
      errors.push(`Le champ ${field} est obligatoire !`)
    }
  }

  function checkPasswordConfirmError(pass1, pass2, errors) {
    if (pass1 !== pass2) {
      errors.push(`Les passwords ne correspondent pas !`)
    };
  }
}

function getMissingFields(userData) {
  let missingFields = [];
  for (const [key,val] of Object.entries(userData)) {
    if (!val) {
      missingFields.push(key);
    }
  }
  return missingFields;
}
