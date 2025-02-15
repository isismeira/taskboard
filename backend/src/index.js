const express = require('express');
const routes = require('./routes')
const cors = require('cors')

const app = express();
require('./config/dbConfig')

app.use(cors())
app.use(express.json());
app.use(routes)

app.get('/', (req, res) => {
    res.redirect('/api/annotations')
})

app.listen(4000);