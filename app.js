const path = require("path");
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const session = require("express-session");
var loginbool = false;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/src'));
//app.use(express.bodyParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false
}))


app.use(function(req, res, next){
    res.locals.session = req.session;
    console.log(res.locals.session);
    next();
});


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodeblog"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
});


app.get("/", function(req, res) {
    con.query("SELECT * FROM nodeblogsql", function (err, result) {
        if (err) throw err;
        res.render("index", {layout: "main", data: result});
    });
});

app.get('/viewblog/:id', function(req, res) {
    con.query(`SELECT * FROM nodeblogsql WHERE id="${req.params.id}"`, function (err, result, fields) {
        if (err) throw err;
        res.render("viewblog", {layout: "main", data: result});
    });
});

app.get("/addblog", function(req, res) {
    res.render("addblog", {layout: "main"});
});

app.post("/addnewblog", function(req, res) {
    con.query(`INSERT INTO nodeblogsql (title, author, body) VALUES ("${req.body.title}", "John Doe", "${req.body.body}")`, function (err) {
        if (err) throw err;
        res.render("blogadded", {layout: "main"});
    });
});

app.get("/login", function(req, res) {
    res.render("login", {layout: "main"});
});

app.post("/loginuser", function (req, res) {
    con.query("SELECT * FROM nodebloglogin WHERE loginid = 1", function (err, result) {
        if (req.body.username == "admin" && req.body.password == "password123") {
            res.render("userlogin", {layout: "main", data: result});
        }
        else {
            res.render("incorrectdetails", {layout: "main"});
        }
    });
});


app.listen(8082);