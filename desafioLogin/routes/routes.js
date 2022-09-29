import express from "express";
import { auth } from "../middlewares/auth.js";
import "../db/config.js";
import passport from "passport";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import dotenv from "dotenv"
import {fork} from "child_process"
dotenv.config()

const { Router } = express;
const router = Router();

router.get("/", (req, res) => {
  if (req.session.username) {
    res.redirect("/datos");
  } else {
    res.redirect("/login");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/login-error", (req, res) => {
  res.render("login-error");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "login-error" }),
  (req, res) => {
    res.redirect("/datos");
  }
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, async (err, user) => {
    if (err) console.log(err);
    if (user) res.render("register-error");
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 8);
      const newUser = new User({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      res.redirect("/login");
    }
  });
});

router.get("/datos", auth, async (req, res) => {
  const datosUsuario = await User.findById(req.user._id).lean();
  res.render("datos", {
    datos: datosUsuario,
  });
});

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/info", (req, res) =>{
    res.send(
        `Sistema operativo: ${process.platform}
        Version de Node: ${process.version}
        Process Id: ${process.pid}
        Memoria total reservada: ${process.memoryUsage()}
        Directorio: ${process.cwd()}
        Path de ejecucion: ${process.execPath}`
        
    )
})

router.get("/api/randoms", (req,res) =>{
    const child = fork("./routes/random.js")
    child.on("message",(msg)=>{
        console.log(msg);
    })
    child.send("chau")
    res.json({})
})


export {router}
