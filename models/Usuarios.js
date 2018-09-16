var mongoose = require('mongoose');
var Schema = mongoose.Schema

var UsuarioSchema = new Schema({
  identificacion:  String, 
  usuarioNombre: String,
  usuarioApellido: String,
  email: String,
  faceId: String,
  Imagen: { type: String },
  Puntos: Number,
  created_at: { type: Date, default: Date.now },
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

module.exports = mongoose.model('usuarios', UsuarioSchema);