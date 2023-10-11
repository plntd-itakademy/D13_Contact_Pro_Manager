require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("cookie-session");
const port = 8091;

const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à la DB réussie"))
  .catch(() => console.log("Connexion à la DB échouée"));

app.set("view engine", "ejs");

app.use(session({ secret: process.env.SESSION_SECRET_KEY }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Redirect the user on connection page is not logged
app.use((req, res, next) => {
  if (req.session.logged === false && req.url !== "/connection") {
    res.redirect("/connection");
  } else {
    next();
  }
});

app.use("/", userRoutes);
app.use("/contacts", contactRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});
