var mongoose = require('mongoose');
var Schema = mongoose.Schema

var PromotionSchema = new Schema({
  promotionId:  String, 
  promotionName: String,
  promotionDesc: String,
  CantidadDisponible: Number,
  Categoria:{
    type: Schema.Types.ObjectId,
    ref:'categoria'
  },
  DateIni: { type: Date, default: Date.now },
  DateFin: { type: Date, default: Date.now },
  Images: String,
  PrecioPromotion: Number,
  updated_at: { type: Date, default: Date.now },
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

module.exports = mongoose.model('promotion', PromotionSchema);