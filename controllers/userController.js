const User = require("../models/user");
const bcrypt = require("bcrypt");

const getConnectionForm = (req, res) => {
  if (req.session.userLogged) {
    res.redirect("/contact");
    return;
  }

  res.render("connection");
};

const logUser = async (req, res) => {
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
  const validPassword = await bcrypt.compare(password, user[0].password);

  if (!validPassword) {
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
  res.redirect("/connection");
};

module.exports = { getConnectionForm, logUser, logoutUser };
