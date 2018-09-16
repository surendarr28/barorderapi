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


app.get('/v1/api/search/:key', function (req, res) {
    try {
        let query = "select * from tblitem where item_id LIKE '%" + req.params.key + "%' OR LOWER('name') LIKE '" + req.params.key + "%'"
        client.query(query, (err, result) => {
            if (err) return res.send("Some Error");
            return res.send(query);
        });
    } catch (e) {
        return res.send("Some Error");
    }
});

app.get('/v1/api/additem/:orderid/:itemid/:quantity', function (req, res) {
    try {
        if (!req.params.quantity)
            return res.send("Quantity is Manditory");
        let query = "select * from tblorederitemmapping where order_id = " + req.params.orderid + " AND item_id = " + req.params.itemid + "";
        client.query(query, (err, result) => {
            if (err) return res.send("Some Error");

            if (req.params.quantity == 0 && result.rows.length == 0) {
                return res.send("deleted");
            } else if (req.params.quantity == 0) {
                let deletequery = "delete from tblorederitemmapping where order_id = " + req.params.orderid + " AND item_id = " + req.params.itemid + "";
                client.query(deletequery, (err, result) => {
                    return res.send("deleted");
                });
            } else if (req.params.quantity != 0 && result.rows.length > 0) {
                let updatequery = "update tblorederitemmapping set quantity = " + req.params.quantity + "  where order_id = " + req.params.orderid + " AND item_id = " + req.params.itemid + "";
                client.query(updatequery, (err, result) => {
                    return res.send("updated");
                });
            } else if (result.rows.length == 0) {
                let insertquery = "insert into tblorederitemmapping (order_id,item_id,quantity) values(" + req.params.orderid + "," + req.params.itemid + "," + req.params.quantity + ") set quantity = " + req.params.quantity + "  where order_id = " + req.params.orderid + " AND item_id = " + req.params.itemid + "";
                client.query(insertquery, (err, result) => {
                    return res.send("inserted");
                });
            }
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
                            'values(' + orderResult.rows[0].orderid + ', 1, ' + req.params.tableId + ')';
                        client.query(ordertablemapquery, (err, ordertableMapResult) => {
                            if (err) return res.send("Some Error");

                            let data = {
                                order: orderResult.rows[0].orderid,
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