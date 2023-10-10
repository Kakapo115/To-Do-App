import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyparser from "body-parser";

// Add reference to the routes file
import taskroute from "./routes/api/taskroute";

var app = express();
dotenv.config();

//Add body-parser middleware to handle JSON data
app.use(
  bodyparser.json(),
  cors({
    origin: "https://master--ricky-syme-twitter-clone.netlify.app",
    credentials: true,
  })
);

// Connect to mongo using mongoose.
// Here's where we start using promises
const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      throw err;
    });
};

//var port = 3000;
//Comment out port 3000 and set port 5000 or the production server's
//preconfigured service port
var port = process.env.PORT || 5000;

app.use("/api/tasks", taskroute);

app.get("/", function (req, res) {
  res.json({ reply: "Route for HOME path." });
});

app.listen(port, function () {
  connect();
  console.log("Server started on port:" + port);
});
