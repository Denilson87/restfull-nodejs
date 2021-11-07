const mongoose = require('mongoose');
const { type } = require('os');

const Artigo = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    edicao: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    lingua: {
        type: String,
        required: true
    }

},
    {
        timestamps: true,
    }

);

mongoose.model('artigo', Artigo)