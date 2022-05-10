const express = require('express');
const app = express();
const route = require("./routes/route");
const cors = require('cors');

const port = 3001;
app.use(express.json());
app.use(cors());

//Routes
app.use('/api',route)



app.listen(port, () => {
    console.log("server on")
});