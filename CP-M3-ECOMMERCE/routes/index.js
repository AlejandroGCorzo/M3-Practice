'use strict';

const express = require('express');
// const model = require('../models/model');

const router = express.Router();
module.exports = router;

const models = require('../models/model');

// escriban sus rutas acá
// siéntanse libres de dividir entre archivos si lo necesitan

router.get('/categories', (require, resolve) => {
  resolve.status(200).json(models.listCategories());
});

router.post('/categories', (require, resolve) => {
  let { category } = require.body;
  try {
    resolve.status(201).json({ msg: models.addCategory(category) });
  } catch (error) {
    resolve.status(400).json({ error: error.message });
  }
});

router.get('/products', (require, resolve) => {
  resolve.status(200).json(models.listProducts());
});

router.post('/products', (require, resolve) => {
  let { name, brand, category, stock } = require.body;
  try {
    resolve.status(201).json(models.addProduct(name, brand, category, stock));
  } catch (error) {
    resolve.status(404).json({ error: error.message });
  }
});

router.get('/products/:categoryName', (require, resolve) => {
  let { categoryName } = require.params;
  let { fullName } = require.query;
  try {
    resolve.status(200).json(models.listProducts(categoryName, fullName));
  } catch (error) {
    resolve.status(404).json({ error: error.message });
  }
});

router.get('/reviews', (require, resolve) => {
  let { name } = require.query;
  try {
    resolve.status(200).json(models.getReviews(name));
  } catch (error) {
    resolve.status(404).json({ error: error.message });
  }
});

router.post('/reviews', (require, resolve) => {
  let { name, stars, text, user } = require.body;
  try {
    resolve
      .status(201)
      .json({ msg: models.addReview(name, stars, text, user) });
  } catch (error) {
    resolve.status(400).json({ error: error.message });
  }
});

router.get('/rating', (require, resolve) => {
  resolve.status(200).json(models.getRating());
});

router.get('/rating/:product', (require, resolve) => {
  let { product } = require.params;
  console.log(product);
  if (!product) return resolve.status(200).json(models.getRating());
  try {
    resolve.status(200).json({ rating: models.getRating(product) });
  } catch (error) {
    resolve.status(404).json({ error: error.message });
  }
});
