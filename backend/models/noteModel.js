const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    enum: ['normal', 'urgent'], 
    default: 'normal'
  }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
