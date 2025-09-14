// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { initDb } = require('./data/db');
app.use(express.json());

// Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

// Routes
app.use('/', require('./routes'));

initDb((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  }
});
