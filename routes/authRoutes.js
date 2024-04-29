/* Routes för registrering och inloggning */

const express = require("express");
const router = express.Router();

/* Lägg till ny användare */ 
router.post("/register", async(req, res) => {
    try {
        // LÄGG IN DATUM ????
        const { username, password } = req.body;

        // Validera input
        if(!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password" });
        }

        // Om korrekt - spara användare
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
        if(username === "Ronja" && password === "password") {
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(401).json({error: "Invalid username or password" });
        }

    } catch (error) {
        res.status(500).json({ error: "server error " });
    }
});

module.exports = router;