const Contact = require("../models/contact");

const getContacts = (req, res) => {
  // Redirect user if not logged
  if (req.session.logged === false) {
    res.redirect("/connection");
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

module.exports = { getContacts };
