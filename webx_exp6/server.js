const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// Store existing users (simulated in-memory array)
const users = [];
const existingUsernames = ["john_doe", "jane_smith", "alice_williams", "bob_johnson", "susan_lee", "tom_clark", "lucy_jones", "mike_brown", "emma_davis", "liam_white"];

// Registration route
app.post('/register', (req, res) => {
    const { name, college, username, password } = req.body;

    // Check if username already exists
    if (existingUsernames.includes(username)) {
        return res.status(400).json({ message: "Username is already taken!" });
    }

    // Save new user (simulated)
    users.push({ name, college, username, password });
    existingUsernames.push(username);  // Add the new username to existing usernames array
    res.status(201).json({ message: "Registration successful!" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
