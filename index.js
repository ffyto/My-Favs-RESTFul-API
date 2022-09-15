require('dotenv').config();

const configExpress = require('./config/express');

const connectDb = require('./config/database');
const swagger = require('./config/swagger');

const app = configExpress();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, async () => {
  await connectDb();
  swagger(app);

  console.log(
    `Server running on port http://localhost:${PORT} in ${NODE_ENV} mode`
  );
});
