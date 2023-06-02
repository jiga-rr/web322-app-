const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const storeService = require('./store-service');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Initialize the store data
storeService.initialize()
  .then(() => {
    // Routes once the store data is initialized
    app.get('/shop', (req, res) => {
      storeService.getPublishedItems()
        .then((publishedItems) => {
          res.json(publishedItems);
        })
        .catch((error) => {
          res.status(404).json({ message: error });
        });
    });

    app.get('/items', (req, res) => {
      storeService.getAllItems()
        .then((allItems) => {
          res.json(allItems);
        })
        .catch((error) => {
          res.status(404).json({ message: error });
        });
    });

    app.get('/categories', (req, res) => {
      storeService.getCategories()
        .then((allCategories) => {
          res.json(allCategories);
        })
        .catch((error) => {
          res.status(404).json({ message: error });
        });
    });

    // Route for any other request that doesn't match the defined routes
    app.use((req, res) => {
      res.status(404).send('Page Not Found');
    });

    // Redirect the root route to the '/about' route
    app.get('/', (req, res) => {
      res.redirect('/about');
    });

    // Return the about.html file from the views folder
    app.get('/about', (req, res) => {
      res.sendFile(__dirname + '/views/about.html');
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Express http server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error initializing store data:', error);
  });
