var express = require('express')
var path = require('path');
var app = express();
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

client.connect(); 


app.use(express.static(path.resolve(__dirname, 'app/build')));
console.log(path.resolve(__dirname, 'app/build')); 

app.get('/check', function (req, ress) {

    client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            ress.send(row);
        }
        client.end();
    });

});

app.get("/env", (req, res) => {
    res.send(process.env);
})

app.get('/test', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'app/build/index.html'));
})

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!')
})