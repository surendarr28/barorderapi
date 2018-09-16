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

app.get('/v1/api/tables', function (req, res) {
    try {
        client.query('SELECT * from tblTable where isAvail = true;', (err, result) => {
            if (err) return res.send("Some Error");
            return res.send(result.rows);

        });
    } catch (e) {
        return res.send("Some Error");
    }
});

app.get('/v1/api/tables/:tableId', function (req, res) {
    try {
        console.log(req.params.tableId);
        let query = 'select otm.order_id, item.name, oim.status, oim.quantity, oim.order_id, item.item_id from tblordertablemapping as otm' +
            ' join tblorederitemmapping as oim on oim.order_id = otm.order_id' +
            ' join tblitem as item on item.id = oim.item_id' +
            ' where otm.table_id = ' + req.params.tableId + ' and otm.orderstatus = 1';
        client.query(query, (err, result) => {
            if (err) return res.send("Some Error");

            let queryGetTableOrder = "select * from tblordertablemapping" +
                ' where table_id = ' + req.params.tableId + ' and orderstatus = 1';
            client.query(queryGetTableOrder, (err, tableResult) => {
                if (err) return res.send("Some Error");

                if (tableResult.rows.length === 0) {
                    let orderQuery = 'insert into tblorder (orderstatus) values(1) RETURNING orderid';
                    client.query(orderQuery, (err, orderResult) => {
                        if (err) return res.send("Some Error");

                        let ordertablemapquery = 'insert into tblordertablemapping (order_id, orderstatus, table_id) ' +
                            'values(' + orderResult.row[0].orderid + ', 1, ' + req.params.tableId + ')';
                        client.query(ordertablemapquery, (err, ordertableMapResult) => {
                            if (err) return res.send("Some Error");

                            let data = {
                                order: orderResult.row[0].orderid,
                                data: result.rows
                            }
                            return res.send(data);

                        });
                    });
                } else {
                    let data = {
                        order: tableResult.rows[0].order_id,
                        data: result.rows
                    }
                    return res.send(data);
                }

            });
        });
    } catch (e) {
        return res.send("Some Error");
    }
});

app.get('/v1/api/createorder', function (req, res) {
    try {
        console.log(req.params.tableId);
        let query = 'insert into tblorder (orderstatus) values(1) RETURNING orderid';
        client.query(query, (err, result) => {
            if (err) return res.send("Some Error");
            return res.send(result.rows);
            // let queryOrderTableMapping = 
            // client.query(query, (err, result) => {
            //     if (err) return res.send("Some Error");


            // });


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