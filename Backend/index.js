const express = require('express');
const pagesRoute=require('./routes/pageRoute')
const connectDB=require('./utils/db')
const cors = require('cors');
const app = express();
const categoryRoute=require('./routes/categoryRoutes')
const mediaRoute=require('./routes/mediaRoutes')
const BannerRoutes=require('./routes/BannerRoutes')

connectDB();
app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use('/uploads', express.static('uploads', {
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin',  ['http://localhost:5173','http://localhost:5174']);
    res.set('Cache-Control', 'no-store, max-age=0');
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }}));

app.use('/pages',pagesRoute)
app.use('/categories',categoryRoute)
app.use('/media',mediaRoute)
app.use('/menu', require('./routes/menu'))
app.use('/api/banner',BannerRoutes)


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});