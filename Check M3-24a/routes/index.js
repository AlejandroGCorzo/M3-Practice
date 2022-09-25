'use strict';

const models = require('../models/model');
const express = require('express');
// const { response } = require('../app')

const router = express.Router();
module.exports = router;

// Escriban sus rutas acá
// Siéntanse libres de dividir entre archivos si lo necesitan

// Hint:  investigá las propiedades del objeto Error en JS para acceder al mensaje en el mismo.

router.get('/users', (require, resolve) => {
  resolve.json(models.listUsers());
});

router.post('/users', (require, resolve) => {
  const { email, name } = require.body;
  try {
    resolve.status(201).json({ msg: models.addUser(email, name) });
  } catch (error) {
    resolve.status(400).json({ error: error.message });
  }
});

router.patch('/users/plan', (require, resolve) => {
  const { user } = require.query;
  try {
    resolve.status(200).json({ msg: models.switchPlan(user) });
  } catch (error) {
    resolve.status(404).json({ error: error.message });
  }
});

router.get('/series', (require, resolve) => {
  resolve.json(models.listSeries());
});

router.post('/series', (require, resolve) => {
  const { name, seasons, category, year } = require.body;
  try {
    resolve
      .status(201)
      .json({ msg: models.addSerie(name, seasons, category, year) });
  } catch (error) {
    resolve.status(400).json({ error: error.message });
  }
});

router.get('/series/:category', (require, resolve) => {
  let { category } = require.params;
  try {
    resolve.status(200).json(models.listSeries(category));
  } catch (error) {
    resolve.status(404).json({ error: error.message });
  }
});

router.get('/play/:serie', (require, resolve) => {
  let { serie } = require.params;
  let { user } = require.query;
  try {
    resolve.status(200).json({ msg: models.play(serie, user) });
  } catch (error) {
    resolve.status(404).json({ error: error.message });
  }
});

router.get('/watchAgain', (require, resolve) => {
  let { user } = require.query;
  try {
    resolve.status(200).json(models.watchAgain(user));
  } catch (error) {
    resolve.status(404).json({ error: error.message });
  }
});

router.post('/rating/:serie', (require, resolve) => {
  let { serie } = require.params;
  let { email, score } = require.body;
  try {
    resolve.status(200).json({ msg: models.rateSerie(serie, email, score) });
  } catch (error) {
    resolve.status(404).json({ error: error.message });
  }
});
