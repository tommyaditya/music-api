const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const deezerRoutes = require('./routes/deezerRoutes');
const userRoutes = require('./routes/userRoutes');
const songRoutes = require('./routes/songRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');



dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api', deezerRoutes);
app.use('/api/songs', songRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('Welcome to the Music REST API! Visit /api-docs for API documentation.');
  });  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
});