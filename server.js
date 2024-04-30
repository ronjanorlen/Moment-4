/* Applikation för registrering och inloggning */

const express = require("express"); // Inkludera express
const authRoutes = require("./routes/authRoutes"); // Routes
const jwt = require("jsonwebtoken"); // Inkludera jsonwebtoken
const cors = require("cors"); // Inkludera cors
require("dotenv").config(); // Inkludera dotenv

const app = express(); // Använd express
app.use(express.json()); // Middleware för konvertering till json
const port = process.env.PORT || 3000; // Kör angiven port från env-fil eller port 3000

app.use(cors()); // Använd cors för att tillåta alla domäner

/* Routes */
app.use("/api", authRoutes);

/* Skyddad route */
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route!" });
});

/* Validera token */
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Token

    if(token == null) res.status(401).json({ message: "Not authorized for this route - token missing" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) return res.status(403).json({ message: "Invalid JWT" });

        req.username = username; 
        next();
    });
}
/* Starta applikationen */
app.listen(port, () => { 
    console.log("Server running at port: " + port);
})