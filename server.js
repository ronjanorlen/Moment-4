/* Applikation för registrering och inloggning */

const express = require("express"); // Inkludera express
const authRoutes = require("./routes/authRoutes"); // Routes
const jwt = require("jsonwebtoken"); // Inkludera jsonwebtoken
const cors = require("cors"); // Inkludera cors
require("dotenv").config(); // Inkludera dotenv
const Workexperience = require("./models/Jobs"); // Inkludera Jobs-model

const app = express(); // Använd express
app.use(express.json()); // Middleware för konvertering till json
const port = process.env.PORT || 3000; // Kör angiven port från env-fil eller port 3000

app.use(cors()); // Använd cors för att tillåta alla domäner

/* Routes */
app.use("/api", authRoutes);

/* Skyddad route */
app.get("/api/workexperiences", authenticateToken, async (req, res) => {
    try {
        // Hämta data från databasen
        const job = await Workexperience.find({});
        // Kontroll om det finns data i databaser
        if (job.length === 0) {
            // Meddelande om inget data finns i databasen
            return res.status(404).json({ message: "Inga jobberfarenheter funna" });
        } else {
            // Returnerar erfarenheter
            return res.json(job);
        }
        // Om fel
    } catch (error) {
        console.error("Fel vid hämtning av erfarenheter: ", error);
        // Returnera statuskod tillsammans med fel
        return res.status(500).json(error);
    }
});

/* Validera token */
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Token
    // Om besökare inte har tillgång till sidan
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