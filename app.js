const Roupa= require('./model/roupa.model');
const express  = require ('express');
const exphbs = require ('express-handlebars');
const sequelize = require('./config/bd');
const methodOverride = require('method-override');
const app = express();

app.engine(
    'handlebars',
    exphbs.engine({defaultLayout:false}),
);

app.use(
    express.urlencoded({extended: true})
);

app.use(methodOverride('_method'));

app.set(
        'view engine',
        'handlebars'
    );

app.post(
    '/roupas',
    async (req,res) => {
        const {peca, tecido, valor, imagem} = req.body;

        await Roupa.create({
            peca:peca,
            tecido:tecido,
            valor:valor,
            imagem:imagem

        });

        res.redirect('/roupas');
    }
);


app.get(
    '/roupas/cadastrar',
    (req, res) => res.render('cadastrarRoupas')
);

app.get(
    '/roupas/:id/editar',
    async (req,res)=> {
        const id = req.params.id;
        let roupa = await Roupa.findByPk(id, {raw:true})

        res.render('editarRoupa',{ roupa })
    }
)

app.put(
    '/roupas/:id',
    async (req,res) => {
        const id = req.params.id;

        const {peca,tecido,valor,imagem} = req.body;

        const roupa = await Roupa.findByPk(id)

        roupa.peca= peca;
        roupa.tecido = tecido;
        roupa.valor = valor;
        roupa.imagem = imagem;

        roupa.save();

        res.redirect('/roupas')
        

    }
        
)


app.get(
    '/roupas',
    async(req,res) => {
        const roupas = await Roupa.findAll({raw:true});
        res.render('listarRoupas',{roupas})
    }
);

app.get(
    '/',
    (req,res) => res.render('home')
)

app.delete(
  '/roupas/:id', 
  async (req, res) => {
    const id = req.params.id;
    const roupa = await Roupa.findByPk(id);
    await roupa.destroy();
    res.redirect('/roupas');
  }
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

app.listen(
    3000,
    () => console.log ('Servidor em execução')

);


