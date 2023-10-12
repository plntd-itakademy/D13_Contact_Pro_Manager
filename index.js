require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("cookie-session");
const bcrypt = require("bcrypt");
const User = require("./models/user");

const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const contactApiRoutes = require("./routes/api/contactApiRoutes");

const port = 8092;
const app = express();

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à la DB réussie"))
  .catch(() => console.log("Connexion à la DB échouée"));

async function createDemoUser(lastname, firstname, email, password) {
  // Check if user with this email already exists
  const existingUser = await User.find({ email: email });
  if (existingUser.length > 0) return;

  const saltRounds = 10;
  const cryptedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({
    lastname: lastname,
    firstname: firstname,
    email: email,
    password: cryptedPassword,
  });

  user.save().catch((err) => console.log(err));
}

createDemoUser("Dupond", "Jean", "admin@mail.com", "admin123");

app.set("view engine", "ejs");

app.use(session({ secret: process.env.SESSION_SECRET_KEY }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Redirect the user on connection page is not logged
app.use((req, res, next) => {
  if (!req.session.userLogged && req.url !== "/connection") {
    res.redirect("/connection");
  } else {
    next();
  }
});

app.use("/", userRoutes);
app.use("/contact", contactRoutes);
app.use("/api/contacts", contactApiRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});
