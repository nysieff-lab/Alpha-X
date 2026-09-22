const express = require('express');
const app = express();
const cors = require("cors");

const ProductsRouter = require('./Routes/GetProductsAPI.js');
const ItemRouter = require('./Routes/GetItemAPI.js');
const CartItemRouter = require('./Routes/GetCartItemAPI.js');
const LoginsRouter = require('./Routes/GetLoginAPI.js');

app.use(cors({
    origin: "http://localhost:5173"
    /*origin: "http://192.168.0.6:5173"*/
}));

app.use(express.json());

//ROUTES
app.use('/api/products', ProductsRouter);
app.use('/api/item', ItemRouter);
app.use('/api/cartitem', CartItemRouter);
app.use('/api/login', LoginsRouter);

app.listen(3000, () => {
    console.log('server is running on http://localhost:3000');
    //console.log('server is running on http://192.168.0.06:3000');
});