const express = require('express');

const routes = require('./routes/route');
const cors = require('cors');
const app = express();


// Connect to database

// Middleware
app.use(cors())

app.use(express.json())
//app.use(express.urlencoded({ extended: false}))

app.use("/trans", require('./routes/transroute'));
app.use("/", routes);

app.listen(4000, () => {
    console.log("Server is running on port 4000")
});