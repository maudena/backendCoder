const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts"
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://MauriDenardi:coderhouse@cluster0.e1zw3we.mongodb.net/?retryWrites=true&w=majority",
    }),
    secret: "coder",
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 6000
    }
  })
);

const auth = (req, res, next) =>{
    if(req.session.user) return next()
    res.redirect("http://localhost:8080/login")
}

app.get("/login", (req,res) =>{
    res.render("login")
})
app.get("/", auth, (req, res) =>{
    res.render("main",{
        username: req.session.user
    })
})

app.get("/logout", (req, res) =>{
    res.render("logout",{
        username: req.session.user
    })
    req.session.destroy(error =>{
        if(error){
            return res.json({status: "Logout Error", body: error})
        }
        
    })
})

app.post("/login", (req, res) =>{
    const username = req.body.user
    if(username == "mauri"){
        req.session.user = username
        res.redirect("http://localhost:8080")
    }
    res.send("Error de logueo, intente nuevamente")
})



const server = app.listen(8080, () => {
    console.log("Servidor ok en 8080");
  });
  server.on("error", (error) => `Error en el servidor ${error}`);