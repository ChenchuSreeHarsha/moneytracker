const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expenseRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const path = require('path');
const app = express();

app.use('/expenses', expenseRoutes);
app.use('/income', incomeRoutes);


const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/money_tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.error('Error connecting to MongoDB:', err));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
