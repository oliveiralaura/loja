const path = require('path');
const bodyParser = require('body-parser');
const express = require("express");
const banco = require('./repository/database');
const session = require('express-session');
const crypto = require('crypto');
const GamerDAO = require('./DAO/gamerDAO');


const app = express()

const consign = require("consign");
const gamerDAO = require('./DAO/gamerDAO');

app.set('view engine', 'ejs')
app.set('views','mvc/views/ctrldev')
app.use(express.static('mvc/views/public'))

const db = new banco();

const generateRandomSecret = () => {
    return crypto.randomBytes(64).toString('hex');
};

app.use(session({
    secret: generateRandomSecret(),
    resave: false,
    saveUninitialized: true
}));



// Configuração do Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// Configurando o diretório para servir arquivos estáticos
app.use(express.static(path.resolve(__dirname, "./mvc/views/ctrldev")));

// Rota para a página inicial
app.get("/admin", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const gamer = new gamerDAO()
    let lista_gamer = await gamer.consultarGamers()
    res.render('index', {gamers: lista_gamer})
});

// Rota para processar o formulário de login
app.post('/login', async (req, res) => {
    const email = req.body.txtctrllogin;
    const senha = req.body.txtctrlpass;
  
    // Consulta SQL para verificar o login usando método da classe Database
    try {
        const result = await db.verificarLogin(email, senha);
        if (result.length > 0) {
            // Se o login for bem-sucedido, armazene o e-mail na sessão
            req.session.email = email;
            res.redirect('/home');
        } else {
            // Se o login falhar, redirecione para error.html
            res.redirect('/error');
        }
    } catch (error) {
        console.error('Erro ao verificar o login:', error);
        res.redirect('/error');
    }
});
app.post("/registrargamer", async (req, res) => {
    const gamerDAO = new GamerDAO();
    res.setHeader("Access-Control-Allow-Origin", "*");
    const { txtnomegamer, txtemailgamer, txtsenhagamer, txtdatagamer, txtcoingamer, txtpersongamer } = req.body;
    console.log('txtnomegamer:', txtnomegamer);
    console.log('txtemailgamer:', txtemailgamer);

    try {
        const retorno = await gamerDAO.registrarGamer(txtnomegamer, txtemailgamer, txtsenhagamer, txtdatagamer, txtcoingamer, txtpersongamer)
        if (retorno) {
            // Se o registro for bem-sucedido, armazene o e-mail na sessão
            req.session.email = txtemailgamer;
            res.redirect('/home');
        } else {
            // Se o registro falhar, redirecione para error.html
            res.redirect('/error');
        }
    } catch (error) {
        console.error('Erro ao registrar o gamer:', error);
        res.redirect('/error');
    }
});



app.use((req, res, next) =>{
    if(req.url === '/admin'){
        next();
    }else if(req.session && req.session.email){
        next();
    }else{
        res.redirect('/admin');
    };
})

// Rota para a página home
app.get("/home", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.render('home', {email: req.session.email})
});

// Rota para a página de erro
app.get("/error", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(__dirname, "./mvc/views/ctrldev", "error.html"));
});
app.get("/logout", async(req, res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(__dirname, "./mvc/views/ctrldev", "logout.html"));

})
app.get('/destroi', (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.status(500).send('Erro interno ao fazer logout');
            
        }else{
           
            res.sendFile(path.resolve('mvc/views/ctrldev/index'));
        }
    })
})
app.use(express.json())

app.use(express.urlencoded({extended: true}))

consign()
        .include("mvc/controllers")
        .into(app)

app.listen(3001, () => console.log("Online Server at port 3001"))

app.use(bodyParser.urlencoded({ extended: true }));

// Configurando o diretório para servir arquivos estáticos
 app.use(express.static(path.resolve(__dirname, '../views/ctrldev')));

 
module.exports = app