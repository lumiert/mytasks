const express = require('express');
const app = express();
const port = 80;
const path = require('path');
const notes = (path.join(__dirname, './api/notesdb.json'));

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
        res.sendFile(notes);
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

app.get('/app/edit', function(req, res) {
    var id = req.query.id;

    // Se precisar passar o ID para o arquivo HTML, você pode fazer assim:
    res.sendFile(path.join(__dirname, './htdocs/edit.html'));
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Online na porta ${port}`);
});