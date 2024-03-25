const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => {
    try {
        res.redirect('/app');
    } catch(err) {
        console.log(err);
        res.status(500).send('Erro interno do servidor');
    }
});

app.get('/app', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, './htdocs/app.html'));
    } catch(err) {
        console.log(err);
        res.status(500).send('Erro interno do servidor');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});