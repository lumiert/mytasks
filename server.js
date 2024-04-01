const express = require('express');
const app = express();
const port = 80;
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const tasksFilePath = path.join(__dirname, 'api', 'taskdb.json');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    try {
        res.redirect('/app');
    } catch(err) {
        console.log(err);
        res.status(500).send('Erro');
    }
});

app.post('/new', (req, res) => {
    try {
        // Ler o conteúdo do arquivo JSON
        const data = fs.readFileSync(tasksFilePath);
        let tasks = JSON.parse(data);

        // Encontrar o maior ID atualmente existente
        const maxId = tasks.todo.reduce((max, task) => Math.max(max, task.id), 0);

        // Criar a nova tarefa
        const newTask = {
            id: maxId + 1, // Incrementar o ID
            task: 'Nova tarefa',
            date: new Date().toLocaleDateString(),
            complete: false
        };

        // Adicionar a nova tarefa à lista de tarefas
        tasks.todo.push(newTask);

        // Escrever o conteúdo atualizado de volta no arquivo JSON
        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));

        res.status(200).send('Nova tarefa criada com sucesso');
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('Erro ao criar nova tarefa');
    }
});

app.put('/tasks/:id', (req, res) => {
    try {
        const taskId = req.params.id;
        const checked = req.body.checked;

        const data = fs.readFileSync(tasksFilePath);
        let tasks = JSON.parse(data);

        const task = tasks.todo.find(task => task.id === parseInt(taskId));

        if (task) {
            if (req.body.title) {
                task.task = req.body.title;
            }

            if (checked !== undefined) {
                task.complete = checked;
            }

            fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));

            res.status(200).send('Estado da tarefa atualizado com sucesso');
        } else {
            res.status(404).send('Tarefa não encontrada');
        }
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('Erro ao atualizar estado da tarefa');
    }
});

app.get('/tasks', (req, res) => {
    try {
        const data = fs.readFileSync(tasksFilePath);
        const tasks = JSON.parse(data);
        res.json(tasks.todo);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('Erro ao buscar tarefas');
    }
});

app.delete('/tasks/:id', (req, res) => {
    try {
        const taskId = req.params.id;

        const data = fs.readFileSync(tasksFilePath);
        let tasks = JSON.parse(data);

        const taskIndex = tasks.todo.findIndex(task => task.id === parseInt(taskId));

        if (taskIndex !== -1) {

            tasks.todo.splice(taskIndex, 1);

            fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));

            res.status(200).send('Tarefa excluída com sucesso');
        } else {
            res.status(404).send('Tarefa não encontrada');
        }
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('Erro ao excluir a tarefa');
    }
});

app.get('/app', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'htdocs', 'app.html'));
    } catch(err) {
        console.log(err);
        res.status(500).send('Erro');
    }
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Online na porta ${port}`);
});