const express = require("express");

const app = express();

const port = 8000;
const db = require("./config/mongoose");

//This parse body and convert it in JSON format
app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// any request comming will be directed to the routes folder
app.use("/api", require("./routes"));

// any unhandel route ends up here
app.all("*", (_, res) => {
  res.status(501).json({
    status: "failure",
    message: "No such routes are found",
  });
});

app.listen(port, (err) => {
  if (err) console.log(`Error : ${err}`);
  console.log(`Server is running on port`, port);
});
