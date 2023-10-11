const User = require("../models/user");

const getConnectionForm = (req, res) => {
  req.session.logged = false;
  res.render("connection");
};

const logUser = (req, res) => {
  const errors = [];
  const email = req.body.email;
  const password = req.body.password;

  if (email === "") {
    errors.push("Le champ email est requis.");
  }

  if (password === "") {
    errors.push("Le champ mot de passe est requis.");
  }

  if (errors.length > 0) {
    res.render("connection", {
      errors: errors,
      email: email,
    });

    return;
  }

  if (email !== "admin@mail.com" || password !== "admin") {
    errors.push("Email ou mot de passe incorrect.");

    res.render("connection", {
      errors: errors,
      email: email,
    });

    return;
  }

  req.session.logged = true;

  res.redirect("/");
};

const logoutUser = (req, res) => {
  req.session.logged = false;
  res.redirect("/connection");
};

module.exports = { getConnectionForm, logUser, logoutUser };
