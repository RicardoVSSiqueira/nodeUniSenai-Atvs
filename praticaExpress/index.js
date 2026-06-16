import express from 'express';

const app = express();

var carros = ['fiesta', 'saveiro'];

app.use(express.urlencoded({extend: true}));

app.get('/', (req, res) =>
res.send("<h3>Rotas no Express</h3><p>Rota '/'")
);

app.get('/sobre', (req, res) =>
res.send("<h3>Rotas no Express</h3><p>Vamos aprender a utilizar Rotas no Express</p>"));

app.get('/users/:name', (req, res) =>{
    return res.json([name]);
});

app.post('/cars/', (req, res) => {
    let name = req.body.name;
    carros[(carros.length)] = name;
    return res.json([carros[(carros.length - 1)]]);
});

app.get('/cars/:id', (req, res) =>{
    let id = req.params.id;
    return res.json([carros[id]])
});


app.listen(3000, () => 
console.log('Servidor iniciado na porta 3000')
);