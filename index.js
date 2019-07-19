const express = require('express');

const app = express();
const port = 3000;
const apiRoutes = require('./lib/routes');
const viewRoutes = require('./views/routes');
const { userRepository, itemRepository, orderRepository } = require('./lib/repositories');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('view engine', 'ejs');

// static files
app.use(express.static('public'));

app.use((req, res, next) => {
  res.locals.userRepository = userRepository;
  res.locals.itemRepository = itemRepository;
  res.locals.orderRepository = orderRepository;
  next();
});

app.use('/', viewRoutes);
app.use('/api', apiRoutes);

app.use((req, res, next) => {
  // Handle 404 cases
  if (!res.headersSent) {
    res.status(404).render('pages/404');
  }
  return next();
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Shop app listening on port ${port}!`));
