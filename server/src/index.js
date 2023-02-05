import express from 'express'
import fs from 'fs'
import https from 'https'
import cors from 'cors'

import userRoutes from './routes/auth.routes.js'
import ticketRoutes from './routes/tickets.routes.js'
import itemsRoutes from './routes/items.routes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use(userRoutes)
app.use(ticketRoutes)
app.use(itemsRoutes)

app.listen(7777, () => { 
    console.log('*** API ON ' + 'http://127.0.0.1:7777')
})