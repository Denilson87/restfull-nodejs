const mongoose = require('mongoose');
const { type } = require('os');

const Artigo = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },

    conteudo: {
        type: String,
        required: true
    }

},
    {
        timestamps: true,
    }

);

mongoose.model('artigo', Artigo)