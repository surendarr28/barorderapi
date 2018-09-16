var express = require('express')
var path = require('path');
var app = express();
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

client.connect();


app.get('v1/api/tables', function (req, res) {
    try {
        client.query('SELECT * from tblTable where isAvail = true;', (err, result) => {
            if (err) return res.send("Some Error");;
            res.send(result.rows);
            return client.end();
        });
    } catch (e) {
        return res.send("Some Error");
    }
});

app.get('/', function (req, res) {
    res.send("oreder me");
})

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!')
})