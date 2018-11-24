const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

// API calls
/*
app.get("/api/hello", (req, res) => {
  res.send({ express: { message: "Hello From Express", user: "?" } });
});
*/

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const config = require("./config");

const router = require("./routers");

app.use("/assets", express.static(`${__dirname}/public`));

app.set("view engine", "ejs");

mongoose.connect(config.getDbConnectionString(), {useNewUrlParser: true});

// Redirection vers le router
app.use("/", router.accueil);
app.use("/seen", router.seen);
app.use("/extractMAL", router.extract);
app.use("/watching", router.watching);

app.listen(port, () => console.log(`Listening on port ${port}`));
