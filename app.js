const Roupas = require('./models/roupa.model');
const express  = require ('express');
const exphbs = require ('express-handlebars');
const sequelize = require('./config/bd');
const app = express();

app.engine(
    'handlebars',
    exphbs.engine({defaultLayout:false}),
);

app.use(
    express.urlencoded({extended: true})
);

app.post(
    '/roupas/cadastrar',
    async (req,res) => {
        const {peça, tecido, valor, imagem} = req.body;
    
    

        await Roupas.create({
            peça:peça,
            tecido:tecido,
            valor:valor,
            imagem:imagem

        });

        res.send('Roupa cadastrada com sucesso!');
    }
);

app.set(
        'view engine',
        'handlebars'
    );

app.get (
    '/',
    (req,res) => {
        res.send('Testando o express!');
    }
);


app.get(
    '/roupas/cadastrar',
    (req, res) => res.render('cadastrarRoupas')
);



app.get(
    '/roupas',
    (req,res) => {
        res.json({
            id:1,
            peça:'Camisa',
            tecido:'Algodão',
            valor:50.00
        });
    }
);



app.listen(
    3000,
    () => console.log ('Servidor em execução')

);


async function conectarBD() {
  try {
    await sequelize.sync();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (erro) {
    console.error('Erro ao conectar:', erro);
  }
}

conectarBD();
