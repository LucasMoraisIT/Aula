const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();
const adminRoutes = require("./routes/admin");
const path = require("path");

// Configuração do Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Conexão com o MongoDB
mongoose
    .connect("mongodb://127.0.0.1/blogapp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Mongo conectado!"))
    .catch((err) => console.error("Erro ao conectar com o MongoDB:", err));

// Configuração do Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração da sessão
app.use(
    session({
        secret: "bemsecreto",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

// Middleware para mensagens flash
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

// Configuração dos arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rotas Admin
app.use("/admin", adminRoutes);

// Inicialização do servidor
const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});