const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); 


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client.html')); 
});

// Static arrays
let existingUsers = [
  'admin', 'abc', 'xyz', 'test', 'user',
  'nayaab'
];

const colleges = [
  'VESIT', 'VPM', 'Somaiya', 'St.Xaviers', 'Saboo Siddik',
  'Don Bosco', 'IITB', 'Terna', 'AP Shah', 'KC'
];

// Username live check
app.post('/check-username', (req, res) => {
  const { username } = req.body;
  const exists = existingUsers.includes(username);
  res.json({ exists });
});

// College suggestions
app.get('/suggest', (req, res) => {
  const q = req.query.q.toLowerCase();
  const matches = colleges.filter(c => c.toLowerCase().includes(q));
  res.json(matches);
});

// Register
app.post('/register', (req, res) => {
  const { username } = req.body;
  if (!existingUsers.includes(username)) {
    existingUsers.push(username); 
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
