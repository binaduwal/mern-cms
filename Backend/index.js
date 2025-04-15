const express = require('express');
const pagesRoute=require('./routes/pageRoute')
const connectDB=require('./utils/db')
const cors = require('cors');
const app = express();

connectDB();
app.use(cors());

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/pages',pagesRoute)


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});