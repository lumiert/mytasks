const express = require('express');
const app = express();
const port = 80;
const path = require('path');
const { MongoClient } = require('mongodb');
const uri = 'mongodb://26.138.203.133:27017';
const dbName = 'MyNotes';
const collectionName = 'MyNotes';

async function connectToMongoDB() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      await client.connect();
      console.log('Conectado ao MongoDB');
      const db = client.db(dbName);
      const collection = db.collection(collectionName); 

      const result = await collection.insertOne({ key: 'value' });
      console.log('Documento inserido com sucesso:', result.insertedId);
    } catch (err) {
      console.error('Erro ao conectar ao MongoDB:', err);
    } finally {
      await client.close();
      console.log('Conexão com o MongoDB fechada');
    }
  }

  connectToMongoDB();

app.get('/', (req, res) => {
    try {
        res.redirect('/app');
    } catch(err) {
        console.log(err);
        res.status(500).send('Erro');
    }
});

app.get('/notes', (req, res) => {
    try {
        res.json();
    } catch {
        res.status(500).send('Erro')
    }
})

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