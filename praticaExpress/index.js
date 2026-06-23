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
    let name = req.body && req.body.name;

    if(!name){
        return res.status(400).json({erro: 'envie name em x-www-form-urlencoded'});
    }
    carros[(carros.length)] = name;
    return res.json([carros[(carros.length - 1)]]);
});

app.get('/cars/:id', (req, res) =>{
    let id = req.params.id;

    if(isNaN(id)){
        id = carros.indexOf(id);
    }

    if(id < 0 || carros[id] === undefined){
        return res.status(404).json({erro: 'carro não encontrado'});
    }
    return res.json([carros[id]])
});

app.put('/cars/uptade/:id', (req, res)=>{
    let name = req.body.name;
    carros[req.params.id] = name;
    return res.json(carros[req.params.id]);
});

app.delete('/cars/delete/:id', (req, res)=>{
    let id = req.params.id;
    carros[id] = null;
    return res.json(carros[id]);
})

app.listen(3000, () => 
console.log('Servidor iniciado na porta 3000')
);

