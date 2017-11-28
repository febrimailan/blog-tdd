const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const apiRoutes = require('./routes');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', apiRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Page not found'
  });
});

var port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('running on port : ', port);
});

module.exports = app;
