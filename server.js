var express = require('express');
var path = require('path');
var cors = require('cors');
var app = express();
const { Client } = require('pg');

app.use(cors());

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

client.connect();

// app.use(express.static(path.resolve(__dirname, 'app/build')));
// console.log(path.resolve(__dirname, 'app/build'));

/**
 * GET TABLE API
 */
app.get('/v1/api/tables', function (req, res) {
    try {
        client.query('SELECT * from tblTable where isAvail = true;', (err, result) => {
            if (err) return res.send("Some Error");
            return res.send(result.rows);

        });
    } catch (e) {
        return res.send("Some Error on getting tables");
    }
});

/**
 * Search API
 */
app.get('/v1/api/search/:key', function (req, res) {
    try {
        let query = `select * from tblitem where item_id LIKE '%${req.params.key}%' OR LOWER("name") LIKE '%${req.params.key}%'`
        client.query(query, (err, result) => {
            if (err) return res.send("Some Error on searching item");
            return res.send(result.rows);
        });
    } catch (e) {
        return res.send("Some Error");
    }
});


/**
 * status of item 0=kitchen, 1=readytotable, 2=intable, 3=bill
 */
app.get('/v1/api/updateitem/:orderid/:itemid/:status', function (req, res) {
    try {
        let updatequery = "update tblorederitemmapping set status = " + req.params.status + " where order_id = " + req.params.orderid + " AND item_id = " + req.params.itemid + "";
        console.log(updatequery);
        client.query(updatequery, (err, result) => {
            let ress = {response:"updated item status"};
            return res.send(ress);
        });
    } catch (e) {
        return res.send("Some Error");
    }
});

/**
 * add item in table
 */
app.get('/v1/api/additem/:orderid/:itemid/:quantity', function (req, res) {
    try {
        if (req.params.quantity === null)
            return res.send("Quantity is Manditory");
        let query = "select * from tblorederitemmapping where order_id = " + req.params.orderid + " AND item_id = " + req.params.itemid + "";
        console.log(query);
        client.query(query, (err, result) => {
            if (err) return res.send("Some Error on seleting order item mapping");

            if (req.params.quantity == 0 && result.rows.length == 0) {
                return res.send({response:"no data to delete"});
            } else if (req.params.quantity == 0) {
                let deletequery = "delete from tblorederitemmapping where order_id = " + req.params.orderid + " AND item_id = " + req.params.itemid + "";
                console.log(deletequery);
                client.query(deletequery, (err, result) => {
                    return res.send({response:"deleted"});
                });
            } else if (req.params.quantity != 0 && result.rows.length > 0) {
                let updatequery = "update tblorederitemmapping set status = 0, quantity = " + req.params.quantity + "  where order_id = " + req.params.orderid + " AND item_id = " + req.params.itemid + "";
                console.log(updatequery);
                client.query(updatequery, (err, result) => {
                    return res.send({response:"updated"});
                });
            } else if (result.rows.length == 0) {
                let insertquery = "insert into tblorederitemmapping (order_id,item_id,quantity) values(" + req.params.orderid + "," + req.params.itemid + "," + req.params.quantity + ")";
                console.log(insertquery);
                client.query(insertquery, (err, result) => {
                    return res.send({response:"inserted"});
                });
            }
        });
    } catch (e) {
        return res.send("Some Error");
    }
});

/**
 * get table order or create order.
 */
app.get('/v1/api/tables/:tableId', function (req, res) {
    try {
        console.log(req.params.tableId);
        let query = 'select otm.order_id, item.id, item.name, oim.status, oim.quantity, oim.order_id, item.item_id from tblordertablemapping as otm' +
            ' join tblorederitemmapping as oim on oim.order_id = otm.order_id' +
            ' join tblitem as item on item.id = oim.item_id' +
            ' where otm.table_id = ' + req.params.tableId + ' and otm.orderstatus = 1 ORDER BY oim.created_at ASC NULLS LAST';
        console.log(query);
        client.query(query, (err, result) => {
            if (err) return res.send("Some Error on seleting order");

            let queryGetTableOrder = "select * from tblordertablemapping" +
                ' where table_id = ' + req.params.tableId + ' and orderstatus = 1';
            console.log(queryGetTableOrder);
            client.query(queryGetTableOrder, (err, tableResult) => {
                if (err) return res.send("Some Error on order table mapping");

                if (tableResult.rows.length === 0) {
                    let orderQuery = 'insert into tblorder (orderstatus) values(1) RETURNING orderid';
                    console.log(orderQuery);
                    client.query(orderQuery, (err, orderResult) => {
                        if (err) return res.send("Some Error on adding to order");

                        let ordertablemapquery = 'insert into tblordertablemapping (order_id, orderstatus, table_id) ' +
                            'values(' + orderResult.rows[0].orderid + ', 1, ' + req.params.tableId + ')';
                        console.log(ordertablemapquery);
                        client.query(ordertablemapquery, (err, ordertableMapResult) => {
                            if (err) return res.send("Some Error on order item mapping");

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

/**
 * status of item 0=kitchen, 1=readytotable, 2=intable, 3=bill
 */
app.get('/v1/api/updateorder/:orderid/:status', function (req, res) {
    try {
        let updatequery = "update tblorder set orderstatus = " + req.params.status + " where orderid = " + req.params.orderid + "";
        console.log(updatequery);
        client.query(updatequery, (err, result) => {
            return res.send({response:"updated order status"});
        });
    } catch (e) {
        return res.send("Some Error");
    }
});

// app.get('/v1/api/createorder', function (req, res) {
//     try {
//         console.log(req.params.tableId);
//         let query = 'insert into tblorder (orderstatus) values(1) RETURNING orderid';
//         client.query(query, (err, result) => {
//             if (err) return res.send("Some Error");
//             return res.send(result.rows);
//             // let queryOrderTableMapping = 
//             // client.query(query, (err, result) => {
//             //     if (err) return res.send("Some Error");


//             // });


//         });
//     } catch (e) {
//         return res.send("Some Error");
//     }
// });

// app.use(express.static(path.resolve(__dirname, 'app/build')));
// console.log(path.resolve(__dirname, 'app/build'));


app.get('/', function (req, res) {
    // res.sendFile(path.resolve(__dirname, 'app/build/index.html'));
})

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!')
})