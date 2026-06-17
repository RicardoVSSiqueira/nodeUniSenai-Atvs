// carregando o express
import express from 'express';
//instacio o express e carregando a biblioteco do express dentro dessa conts app.
const app = express();
app.use(express.json());

//Lista de Games

let games =[
    {id: 1, title: "Sea of Thieves", studio: "Rare", price: 30},
    {id: 2, title: "WOW", studio: "Blizzard", price: 120},
    {id: 3, title: "Valorant", studio: "Riot", price: 0},
    {id: 4, title: "COD", studio: "Activision", price: 200},
    {id: 5, title: "Minecrat", studio: "Mojang", price: 80},
    {id: 6, title: "Halo", studio: "Microsoft", price: 90},
    {id: 7, title: "FIFA 19", studio: "EA", price: 25},
    {id: 8, title: "FIFA 20", studio: "EA", price: 25},
    {id: 9, title: "FIFA 21", studio: "EA", price: 25}
];

const BuscarJogoPorStudio = (studioJogo) =>{
    return games.filter(jogo => jogo.studio.toLowerCase().includes(studioJogo.toLowerCase()));
}


app.get("/games", (req, res) =>{
    const studioJogo = req.query.busca;
    const resultado = studioJogo ? BuscarJogoPorStudio(studioJogo) : games;
    if(resultado.length > 0){
        res.json(resultado);
    }else{
        res.status(404).send({"erro": "Nenhuma Jogo encontrado"});
    }   
});

app.get('/games', (req, res) =>{
    const studioJogo = req.query.busca;
    const gamesFiltrados = games.filter(jogo = jogo.studio.includes(studioJogo));
    const resultado = studioJogo ? gamesFiltrados : games;

    res.json(resultado);
});

app.get('/games/:idjogo', (req, res) =>{
    const idJogo = parseInt(req.params.idjogo);
    let mensagemErro = '';
    let jogo;

    if(!(isNaN(idJogo))){
        jogo = games.find(g => g.id === idJogo);

        if(!jogo){
            mensagemErro = 'Jogo não encontrada';
        }
    }else{
            mensagemErro = 'Requisição inválida';
        }
    

    if (jogo){
        res.json(jogo);
    }else{
        res.status(404).send({"erro": mensagemErro});
    }

    
});



app.post("/novogame", (req, res) =>{
    let title = req.body.title;
    let studio = req.body.title;
    let price = req.body.title;

    console.log(title);
    console.log(studio);
    console.log(price);

    res.send("OK");
    
    let newGame = { title, studio, price}

    games.push(newGame);
    
})

//att um curso 

app.put('/novogame/:index', (req, res) =>{
    const { index } = req.params;
    let title = req.body.title;
    let studio = req.body.studio;
    let price = req.body.price;

    games[index] = {title, studio, price};

    return res.json(games);
});

app.delete("/:index", (req, res) =>{
    const {index} = req.params;
    games.splice(index,1);
    return res.json({message: "O jogo foi deletado "});
});

app.listen(3080, () =>{
    console.log("Servidor rodando!");

});