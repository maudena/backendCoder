/**
 * Productos.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      title: { type: "String", required: true },
      price: { type: "Number", required: true },
      stock: { type: "Number", required: true },
      filename: { type: "String", required: false },
      path:{ type: "String", required: false },
      originalname: { type: "String", required: false},
      inCart: {type: "Boolean", defaultsTo: false}
  },

};

