const express = require('express');
const pagesRoute=require('./routes/pageRoute')
const connectDB=require('./utils/db')
const cors = require('cors');
const app = express();
const categoryRoute=require('./routes/categoryRoutes')
const mediaRoute=require('./routes/mediaRoutes')
const BannerRoutes=require('./routes/BannerRoutes')
const serviceRoutes=require('./routes/ServiceRoutes')
const permissionRoutes=require('./routes/permissionRoutes')
const roleRoutes=require('./routes/roleRoutes')
const authRoutes=require('./routes/authRoutes')
const userRoutes=require('./routes/userRoutes')
const featureRoutes = require("./routes/featureRoutes");
const achievementRoute = require("./routes/achievementRoutes");
const partnerRoute = require("./routes/partnerRoutes");
const joinClubRoute = require("./routes/joinTheClubRoutes");
const wingsRoute = require("./routes/wingsRoutes");
const ctaRoute = require("./routes/callToActionRoutes");
const clubRoute = require("./routes/clubRoutes");
const matchTypeRoute=require("./routes/matchTypeRoutes")
const gameTypeRoute=require("./routes/gameTypeRoutes")
const eventRoute=require("./routes/eventRoutes")
const galleryRoute=require("./routes/galleryRoutes")
const testRoutes=require("./routes/testRoutes")

require('dotenv').config();

connectDB();
app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/features',featureRoutes);

app.use(express.json({ limit: '20mb' ,    type: 'application/json'
}));
app.use(express.urlencoded({ limit: '20mb', extended: true,    type: 'application/x-www-form-urlencoded'
}));
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
app.use('/services',serviceRoutes)
app.use('/permissions',permissionRoutes)
app.use('/roles',roleRoutes)
app.use('/auth',authRoutes)
app.use('/users',userRoutes)
app.use('/achievements',achievementRoute);
app.use('/partners',partnerRoute);
app.use('/join',joinClubRoute);
app.use('/wings',wingsRoute);
app.use('/cta',ctaRoute);
app.use('/club',clubRoute);
app.use('/match',matchTypeRoute);
app.use("/game-type", gameTypeRoute);
app.use("/events", eventRoute);
app.use("/gallery", galleryRoute);
app.use("/test", testRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});