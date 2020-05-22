const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./configs/appConst");

/**
 * Middlewares
 */
const sourceAuth = require("./middlewares/sourceCheck");
/**
 * Routes
 */
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const musicRoutes = require("./routes/musicRoutes");

const app = express();
app.use(bodyParser.json({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.use("/s3_musics", express.static(path.join(__dirname, "s3_musics")));
app.use("/s3_artworks", express.static(path.join(__dirname, "s3_artworks")));

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/music", sourceAuth, musicRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
