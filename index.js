const express = require('express')

const connectDB = require('./config/database')

const router = require('./config/routes')

const app = express()

//connect Database

connectDB()

app.use(express.json())
app.use(router)

app.get('/', (req, res) => res.send('API Running'))
const PORT = process.env.PORT || 3055

app.listen(PORT, () => {
	console.log('server running successfully on Port', PORT)
})
