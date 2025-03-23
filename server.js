const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "message.json"; 
const readData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        return [];
    }
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return data ? JSON.parse(data) : [];
};


const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
};


app.post("/submit", (req, res) => {
    const { name, email, message } = req.body;

    
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        let messages = readData();

        const newMessage = {
            id: messages.length + 1,
            name,
            email,
            message,
            date: new Date().toISOString(),
        };

        messages.push(newMessage); 
        writeData(messages); 

        res.json({ success: true, message: "Form submitted & saved to message.json" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error while saving to file" });
    }
});


app.get("/messages", (req, res) => {
    const messages = readData();
    res.json(messages);
});
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
