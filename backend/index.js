const express = require('express')
const cors = require('cors')
require('dotenv').config()
const DatabaseConnection = require('./database configration/database')
const router = require('./routes')
var cookieParser = require('cookie-parser')
const app = express()
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use('/api',router)


const port = 8080 || process.env.PORT

DatabaseConnection().then(()=>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
        })
})
