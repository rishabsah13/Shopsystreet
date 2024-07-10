const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payments');
const cors = require("cors")
const app = express();
const port = 3000;

app.use(cors(
  {
    origin:["https://shopsystreet-fe.vercel.app/"],
    methods:["POST","GET"],
    credentials:true
  }
))
app.use(bodyParser.json());

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

sequelize.sync()
  .then(() => console.log('Database synchronized...'))
  .catch(err => console.log('Error: ' + err));

app.get('/api/updates', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendUpdate = () => {
    res.write(`data: ${JSON.stringify({ message: 'Product updated' })}\n\n`);
  };

  const interval = setInterval(sendUpdate, 10000);

  req.on('close', () => {
    clearInterval(interval);
  });
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
