var mongoose = require('mongoose');

var CategoriaSchema = new mongoose.Schema({
  categoriaName: String,
  categoriaDesc: String,
},
    {
        timestamps: true,
        toObject: {
              virtuals: true
        },
         toJSON: {
              virtuals: true
        }
    }
);

module.exports = mongoose.model('categoria', CategoriaSchema);