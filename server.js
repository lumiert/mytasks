const express = require('express');
const app = express();
const port = 80;
const path = require('path');

const { MongoClient } = require('mongodb');
const database = 'mongodb://4cj6qlv6-27017.brs.devtunnels.ms:27017';
const dbName = 'MyNotes';
const collectionName = 'MyNotes';

app.get('/', (req, res) => {
    try {
        res.redirect('/app');
    } catch(err) {
        console.log(err);
        res.status(500).send('Erro');
    }
});

app.get('/notes', async (req, res) => {
    try {
        // Conectar ao MongoDB
        const client = new MongoClient(database);
        await client.connect();

        // Acessar o banco de dados MyNotes e a coleção MyNotes
        const db = client.db('MyNotes');
        const collection = db.collection('MyNotes');

        // Consultar todas as notas na coleção
        const notes = await collection.find().toArray();

        // Enviar as notas como resposta
        res.json(notes);

        // Fechar a conexão com o MongoDB
        await client.close();
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('Erro ao buscar notas');
    }
});

app.get('/app', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, './htdocs/app.html'));
    } catch(err) {
        console.log(err);
        res.status(500).send('Erro');
    }
});

app.listen(port, () => {
    console.log(`Online na porta ${port}`);
});