const express = require('express');
const app = express();
const route = require("./routes/route");

const port = 3000;
app.use(express.json());

//Routes
app.use('/api',route)



app.listen(port, () => {
    console.log("server on")
});