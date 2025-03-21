const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Customize this port as needed

// Middleware to parse JSON
app.use(bodyParser.json());

// Simulated user token database
const userTokens = {
  User1: 100,
  User2: 50,
  User3: 200,
};

// Send Tokens Endpoint
app.post('/sendTokens', (req, res) => {
  const { sender, recipient, amount } = req.body;

  // Validate required fields
  if (!sender || !recipient || !amount) {
    return res.status(400).json({ message: 'Invalid request. Missing sender, recipient, or amount.' });
  }

  // Check if sender and recipient exist
  if (!userTokens[sender]) {
    return res.status(404).json({ message: 'Sender not found.' });
  }
  if (!userTokens[recipient]) {
    return res.status(404).json({ message: 'Recipient not found.' });
  }

  // Check if sender has enough tokens
  if (userTokens[sender] < amount) {
    return res.status(400).json({ message: 'Insufficient tokens.' });
  }

  // Process the token transfer
  userTokens[sender] -= amount;
  userTokens[recipient] += amount;

  res.json({
    message: `Successfully sent ${amount} tokens from ${sender} to ${recipient}.`,
    senderBalance: userTokens[sender],
    recipientBalance: userTokens[recipient],
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Send Tokens API is running on http://localhost:${PORT}`);
});
