const app  = require('./server')

const PORT = 5000
app.listen(PORT, () => {
    console.log(`listening on localhost:${PORT}`)
})