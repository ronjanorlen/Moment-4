/* Routes för registrering och inloggning */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

/* Anslut till mongoDB */
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Ansluten till MongoDB");
}).catch((error) => {
    console.error("Fel vid anslutning till databas");
});

/* User model */
const User = require("../models/User");

/* Lägg till ny användare */ 
router.post("/register", async(req, res) => {
    try {
        
        const { username, password } = req.body;

        // Validera input
        if(!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password" });
        }

        // Om korrekt - spara användare
        const user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: "Användare skapad "});

    } catch (error) {
        res.status(500).json({error: "Server error" });
    }
});

/* Logga in användare */
router.post("/login", async(req, res) => {
    try {
        const { username, password } = req.body;

        // Validera input
        if(!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password "});
        }

        // Kontrollera angivna uppgifter
       
        // Finns användare redan?
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({ error: "Felaktiga användaruppgifter "});

        }

        // Kontrollera lösenord 
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return res.status(401).json({ error: "Felaktiga användaruppgifter "});
        } else {
            res.status(200).json({ message: "Användare inloggad" });
        }

    } catch (error) {
        res.status(500).json({ error: "server error " });
    }
});

module.exports = router;