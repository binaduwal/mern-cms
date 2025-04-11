const express = require('express');
const pagesRoute=require('./routes/pageRoute')
const connectDB=require('./utils/db')
const cors = require('cors');
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/pages',pagesRoute)


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});