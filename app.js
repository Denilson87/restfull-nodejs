const { error } = require('console');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("./models/Artigo");
const app = express();

const Artigo = mongoose.model('artigo');

app.use(express.json());

app.use((req, res, next)=>{
    console.log("Acessou o middleware!");
    res.header("Access-Control-Allow-Origin", "http://localhost:8080/");
    res.header("Access-Control-Allow-Methods", 'GET', 'PUT', 'POST, DELETE')
    app.use(cors());
    next();
});

mongoose.connect('mongodb://localhost/books', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('conexao com MongoDB feita com successo !');
}).catch((erro) => {
    console.log('erro de conexao com o MongoDB');
});

app.get("/", (req, res) => {
    Artigo.find({}).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum arquivo encontrado!"
        })
    })
});

app.get("/artigo/:id", (req, res) => {
    console.log(req.params.id);


    Artigo.findOne({ _id: req.params.id }).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400)({
        error: true,
        message: "Nenhum arquivo encontrado!"

        })
    })
    
})

app.put("/artigo/:id", (req, res)=>{
    const artigo = Artigo.updateOne({_id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message:"Ocorreu um erro no registo!"
        });
        return res.json({
            error: false,
            message:"Artigo atualizado com sucesso"
        });
    });
});


app.delete("/artigo/:id", (req, res)=>{
    const artigo = Artigo.deleteOne({_id: req.params.id}, (err)=>{
        if(err) return res.status(400).json({
            error:true,
            message:"Error: Artigo nao foi apagado"
        });
        return res.status(400).json({
            error:false,
            message:"Artigo foi apagado do DB"
        });
    });
});

app.post("/artigo", (req, res) => {
    const artigo = Artigo.create(req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Error: Artigo nao foi cadastrado!"
        });
        return res.status(400).json({
            error: false,
            message: "Sucesso Artigo foi cadastrado no mongoBD!"
        });
    });
});

app.listen(8080, () => {
    console.log('servidor iniciado na porta 8080 confira');
});
