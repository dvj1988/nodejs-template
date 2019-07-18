const express = require('express');

const app = express();
const port = 3000;
const routes = require('./lib/routes');
const { userRepository, itemRepository, orderRepository } = require('./lib/repositories');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
  // Add authentication middleware here
  res.locals.userRepository = userRepository;
  res.locals.itemRepository = itemRepository;
  res.locals.orderRepository = orderRepository;
  next();
});

app.use('/api', routes);
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Shop app listening on port ${port}!`));
