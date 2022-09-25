'use strict';

var characters = [];

var families = [];

module.exports = {
  reset: function () {
    // No es necesario modificar esta función (Ya está completa)
    characters = [];
    families = [];
  },

  // ==== COMPLETEN LAS SIGUIENTES FUNCIONES (vean los test de `model.js`) =====
  listCharacter: function (family, pluckName) {
    // Devuelve un arreglo con todos los personajes
    // Si recibe un nombre de familia como parámetro debería filtrar solo los personajes de ella
    // Si recibe un segundo parámetro en true debe devolver únicamente los nombres de los personajes
    let familyIndex = families.indexOf(family) + 1;
    let familyChars = characters.filter((el) => el.familyId === familyIndex);
    let onlyChars = familyChars.map((el) => el.name);
    if (family && pluckName) return onlyChars;
    if (family) return familyChars;
    return characters;
  },

  addFamily: function (name) {
    // Agrega el apellido de una nueva familia verificando que no exista
    // Debe retornar el nombre de la familia agregado o existente
    if (!families.some((el) => el === name)) families.push(name);
    return name;
  },

  listFamilies: function () {
    // Devuelve un arreglo con todas las familias
    return families;
  },

  addCharacter: function (name, age, family) {
    // Agrega un nuevo personaje, inicialmente sus frases (quotes) deben estar "vacias"
    // Adicionalmente va a ser necesario guardar el número de familia y no su nombre
    // El número de familia debe empezar desde 1 y no desde 0.
    // Debe retornar el personaje creado
    if (!families.some((el) => el === family))
      return { msg: 'La familia ingresada no existe' };
    let familyId = families.indexOf(family) + 1;
    let newChar = { name, age, quotes: [], familyId };
    characters.push(newChar);
    return newChar;
  },

  addQuote: function (name, quote) {
    // Agrega una nueva frase a un personaje en particular con el formato:
    // {text: "Este es el texto de la frase", season: 3}
    let { season, text } = quote;
    if (text === undefined || text.length === 0)
      return { msg: 'Frase no válida' };
    if (season === undefined) season = false;
    let char = characters.find((el) => el.name === name);
    char.quotes.push({ season, text });
    return { msg: 'Frase agregada correctamente' };
  },

  showQuotes: function (name) {
    // Devuelve todas las frases de un personaje en particular
    let char = characters.find((el) => el.name === name);
    if (!char) return [];
    return char.quotes;
  },
};
