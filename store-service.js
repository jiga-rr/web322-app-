const fs = require('fs');

let items = [];
let categories = [];

function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/items.json', 'utf8', (err, itemData) => {
      if (err) {
        reject('Unable to read items file');
        return;
      }
      items = JSON.parse(itemData);

      fs.readFile('./data/categories.json', 'utf8', (err, categoryData) => {
        if (err) {
          reject('Unable to read categories file');
          return;
        }
        categories = JSON.parse(categoryData);

        resolve();
      });
    });
  });
}

function getAllItems() {
  return new Promise((resolve, reject) => {
    if (items.length === 0) {
      reject('No items found');
      return;
    }
    resolve(items);
  });
}

function getPublishedItems() {
  return new Promise((resolve, reject) => {
    const publishedItems = items.filter((item) => item.published === true);
    if (publishedItems.length === 0) {
      reject('No published items found');
      return;
    }
    resolve(publishedItems);
  });
}

function getCategories() {
  return new Promise((resolve, reject) => {
    if (categories.length === 0) {
      reject('No categories found');
      return;
    }
    resolve(categories);
  });
}

module.exports = {
  initialize,
  getAllItems,
  getPublishedItems,
  getCategories,
};
