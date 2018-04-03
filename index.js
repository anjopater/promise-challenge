const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router')
const PORT = process.env.PORT || 3090;
const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router(app);

app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}.`);
});