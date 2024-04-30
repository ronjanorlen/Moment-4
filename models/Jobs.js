
const mongoose = require("mongoose"); // Inkludera mongoose

// Schema för abetserfarenheter
const workSchema = new mongoose.Schema({
    companyname: {
        type: String, 
        required: true
    },
    jobtitle: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true 
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true 
    }
});

const Jobs = mongoose.model("Jobs", workSchema, "myjobs"); // Skapa mongoosemodel med schema workSchema, använd collection "myjobs"
module.exports = Jobs;  // Exportera Jobs