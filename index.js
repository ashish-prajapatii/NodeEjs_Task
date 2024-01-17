const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const articleRoutes = require("./routes/articles");
const path = require("path");

const app = express();
require("dotenv").config();
const cors = require("cors");

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MongoDB connection
mongoose.connect(
  "mongodb+srv://root:swb1234@cluster0.p8vw5.mongodb.net/Articles",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/views", articleRoutes);

// Start the server
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
