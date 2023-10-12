const User = require("../models/user");
const Contact = require("../models/contact");
const crypto = require("crypto");

const getHome = (req, res) => {
  if (!req.session.userLogged) {
    res.render("connection");
    return;
  }

  Contact.find()
    .then((contacts) => {
      res.render("home", { contacts: contacts });
    })
    .catch((err) => {
      console.log(err);
    });
};

const logUser = async (req, res) => {
  // Exit if already logged
  if (req.session.userLogged) return;

  const errors = [];
  const email = req.body.email;
  const password = req.body.password;

  if (typeof email === "undefined" || email === "") {
    errors.push("Le champ email est requis.");
  }

  if (typeof password === "undefined" || password === "") {
    errors.push("Le champ mot de passe est requis.");
  }

  if (errors.length > 0) {
    res.render("connection", {
      errors: errors,
      email: email,
    });
    return;
  }

  const user = await User.find({ email: email });

  if (user.length === 0) {
    errors.push("Email ou mot de passe incorrect.");

    res.render("connection", {
      errors: errors,
      email: email,
    });

    return;
  }

  // Password validation
  const cryptedPassword = crypto
    .createHmac("sha512", process.env.CRYPTO_SECRET_KEY)
    .update(password)
    .digest("base64");

  if (cryptedPassword !== user[0].password) {
    errors.push("Email ou mot de passe incorrect.");

    res.render("connection", {
      errors: errors,
      email: email,
    });

    return;
  }

  req.session.userLogged = user[0].id;

  res.redirect("/");
};

const logoutUser = (req, res) => {
  req.session.userLogged = null;
  res.redirect("/");
};

module.exports = { getHome, logUser, logoutUser };
