'use strict';

const express = require('express');

const router = express.Router();
module.exports = router;

const models = require('../models/model');

// escriban sus rutas acá
// siéntanse libres de dividir entre archivos si lo necesitan
router.get('/houses', (require, resolve) => {
  resolve.json(models.listHouses());
});

router.post('/houses', (require, resolve) => {
  let { house } = require.body;
  resolve.json(models.addHouse(house));
});

router.get('/characters', (require, resolve) => {
  resolve.json(models.listCharacters());
});

router.post('/characters', (require, resolve) => {
  let { name, lastName, house, dateOfBirth, isMuggle } = require.body;
  let newpost = models.addCharacter(
    name,
    lastName,
    house,
    dateOfBirth,
    isMuggle
  );
  if (Object.keys(newpost).length > 1) resolve.status(200).json(newpost);
  resolve.status(404).json(newpost);
});

router.get('/characters/:houseName', (require, resolve) => {
  let { houseName } = require.params;
  let { fullName } = require.query;
  resolve.json(models.listCharacters(houseName, fullName));
});

router.get('/spells', (require, resolve) => {
  let { name } = require.query;
  resolve.json(models.showSpells(name));
});

router.post('/spells', (require, resolve) => {
  let { name, id, spellName, description } = require.body;
  resolve.status(201).json(models.addSpell(name, id, spellName, description));
});

router.get('/wand', (require, resolve) => {
  let { name } = require.body;
  resolve.json(models.showWand(name));
});

router.post('/wand', (require, resolve) => {
  let { name, wood, core, length } = require.body;
  resolve.status(201).json(models.addWand(name, wood, core, length));
});
