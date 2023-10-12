const Contact = require("../models/contact");

function checkContactInputs(req) {
  const errors = [];

  const lastname = req.body.lastName;
  const firstname = req.body.firstName;
  const company = req.body.company;
  const address = req.body.address;
  const phone = req.body.phone;
  const email = req.body.email;
  const sector = req.body.sector;

  if (typeof lastname === "undefined" || lastname === "") {
    errors.push("Vous devez renseigner un nom");
  }

  if (typeof firstname === "undefined" || firstname === "") {
    errors.push("Vous devez renseigner un prénom");
  }

  if (typeof company === "undefined" || company === "") {
    errors.push("Vous devez renseigner une entreprise");
  }

  if (typeof address === "undefined" || address === "") {
    errors.push("Vous devez renseigner une adresse");
  }

  if (
    typeof phone === "undefined" ||
    phone === "" ||
    !phone.match(/^0[1-9][0-9]{8}$/)
  ) {
    errors.push("Vous devez renseigner un numéro de téléphone valide");
  }

  if (
    typeof email === "undefined" ||
    email === "" ||
    !email.match(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i)
  ) {
    errors.push("Vous devez renseigner une adresse email valide");
  }

  const sectors = ["industrie", "informatique", "sante", "education"];

  if (
    typeof sector === "undefined" ||
    sector === "" ||
    !sectors.includes(sector)
  ) {
    errors.push("Vous devez renseigner un secteur valide");
  }

  return errors;
}

function getContacts(req, res) {
  Contact.find()
    .then((contacts) => {
      res.render("home", { contacts: contacts });
    })
    .catch((err) => {
      console.log(err);
    });
}

function getNewContact(req, res) {
  res.render("add-item");
}

function postNewContact(req, res) {
  const errors = checkContactInputs(req);

  if (errors.length > 0) {
    res.render("add-item", {
      data: {
        lastname: req.body.lastName,
        firstname: req.body.firstName,
        company: req.body.company,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        sector: req.body.sector,
        active: req.body.active,
      },
      errors: errors,
    });
    return;
  }

  const contact = new Contact({
    lastname: req.body.lastName,
    firstname: req.body.firstName,
    company: req.body.company,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    sector: req.body.sector,
    active: req.body.active === "on" ? true : false,
  });

  contact
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.render("add-item", {
        errors: [
          "Une erreur est survenue lors de l'enregistrement des données.",
        ],
      });
    });
}

function viewContact(req, res) {
  const id = req.params.id;

  Contact.findById(id)
    .then((contact) => {
      if (contact) {
        res.render("item", { contact: contact });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
}

function getEditContact(req, res) {
  const id = req.params.id;

  Contact.findById(id)
    .then((contact) => {
      if (!contact) {
        res.redirect("/");
        return;
      }

      res.render("edit-item", { contact: contact });
    })
    .catch(() => {
      res.redirect("/");
    });
}

async function postEditContact(req, res) {
  const id = req.params.id;

  const contact = await Contact.findById(id);

  if (!contact) {
    res.redirect("/");
    return;
  }

  const errors = checkContactInputs(req);

  if (errors.length > 0) {
    res.render("edit-item", { contact: contact, errors: errors });
    return;
  }

  contact.lastname = req.body.lastName;
  contact.firstname = req.body.firstName;
  contact.company = req.body.company;
  contact.address = req.body.address;
  contact.phone = req.body.phone;
  contact.email = req.body.email;
  contact.sector = req.body.sector;
  contact.active = req.body.active === "on" ? true : false;

  contact
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
}

async function deleteContact(req, res) {
  const id = req.params.id;
  await Contact.findByIdAndDelete(id).catch(() => null);
  res.redirect("/");
}

module.exports = {
  getContacts,
  getNewContact,
  postNewContact,
  viewContact,
  getEditContact,
  postEditContact,
  deleteContact,
};
