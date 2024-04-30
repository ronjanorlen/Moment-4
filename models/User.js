const mongoose = require("mongoose"); // Inkludera mongoose
const bcrypt = require("bcrypt"); // Inkludera bcrypt för hashat lösenord

/* User schema */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Obligatoriskt
        unique: true, // Måste vara unikt
        trim: true // Ta bort ev mellanslag
    },
    password: {
        type: String,
        required: true, // Obligatoriskt
    },
    created: {
        type: Date,
        default: Date.now // Aktuellt datum som default
    }
});

/* Hash password, körs innan ny användare skapas */
userSchema.pre("save", async function(next) {
    try {
        if(this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10); // Skapa hashat lösenord
            this.password = hashedPassword; // Ersätt lösenord med hashat lösen
        }

        next(); // Registrera användaren
    } catch(error) {
        next(error);
    }
});

/* Registrera användare */
userSchema.statics.register = async function (username, password) {
    try {
        const user = new this({ username, password });
        await user.save();
        return user; 
    } catch(error) {
        throw error;
    }
};

/* Jämför hashat lösenord */
userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);

     } catch (error) {
            throw error;
        }
    }

/* Logga in användare */
userSchema.statics.login = async function (username, password) {
    try {
        const user = await this.findOne({ username }); // Kolla om användare finns
        // Om användare inte finns
        if(!user) {
            throw new Error("Felaktigt användarnamn eller lösenord"); 
        }

        const isPasswordMatch = await user.comparePassword(password); // Kolla om lösenordet stämmer

        // Om fel lösenord
        if(!isPasswordMatch) {
            throw new Error("Felaktigt användarnamn eller lösenord");
        }

        // Om rätt, returnera användare
        return user;

    } catch(error) {
        throw error;
    }
}

const User = mongoose.model("User", userSchema); // Skapa mongoose-model av schemat
module.exports = User; // Exportera User