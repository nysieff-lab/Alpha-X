const express = require('express');
const app = express();
const cors = require("cors");

const ProductsRouter = require('./Routes/GetProductsAPI.js');
const ItemRouter = require('./Routes/GetItemAPI.js');
const CartItemRouter = require('./Routes/GetCartItemAPI.js');
const LoginsRouter = require('./Routes/GetLoginAPI.js');
const CheckoutDataRouter = require('./Routes/GetCheckoutDataAPI.js');
const FiltersRouter = require('./Routes/GetFiltersAPI.js');
const AdminProductsRouter = require('./Routes/GetAdminProductsAPI.js');
const AddStockRouter = require('./Routes/AddStockAPI.js');

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
app.use('/api/checkout', CheckoutDataRouter);
app.use('/api/filters', FiltersRouter);
app.use('/api/adminproducts', AdminProductsRouter);
app.use('/api/addstock', AddStockRouter);

app.listen(3000, () => {
    console.log('server is running on http://localhost:3000');
    //console.log('server is running on http://192.168.0.06:3000');
});