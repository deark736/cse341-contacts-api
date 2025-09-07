const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { initDb } = require('./data/db');

app.use('/', require('./routes'));

initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }
});
