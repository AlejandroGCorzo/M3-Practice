'use strict';

const express = require('express');
const { listFamilies } = require('../models/model.js');
const router = express.Router();
const model = require('../models/model.js');

module.exports = router;

// escriban sus rutas acá:
// siéntanse libres de dividir entre archivos si lo necesitan

router.get('/families', (require, resolve) => {
  resolve.json(model.listFamilies());
});

router.post('/families', (require, resolve) => {
  let { family } = require.body;
  resolve.json(model.addFamily(family));
});

router.get('/characters', (require, resolve) => {
  resolve.json(model.listCharacter());
});

router.post('/characters', (require, resolve) => {
  let { name, age, family } = require.body;
  let newCharReturn = model.addCharacter(name, age, family);
  if (Object.keys(newCharReturn).length > 1) return resolve.json(newCharReturn);
  resolve.status(400).json(newCharReturn);
});

router.get('/characters/:name', (require, resolve) => {
  let { name } = require.params;
  let { pluck } = require.query;
  resolve.json(model.listCharacter(name, pluck));
});

router.get('/quotes', (require, resolve) => {
  let { name, quote } = require.body;
  resolve.json(model.showQuotes(name, quote));
});

router.post('/quotes', (require, resolve) => {
  let { name, quote } = require.body;
  resolve.json(model.addQuote(name, { text: quote }));
});
