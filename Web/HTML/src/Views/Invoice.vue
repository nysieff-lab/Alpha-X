<template>
    <section class="top-banner">
        <h1>Invoice</h1>
    </section>
    <div class="invoice-container" id="invoice-container">
        <section>
            <div class="invoice-header">
                <div class="invoice-logo">
                    <img src="../Assets/Images/Logo V3.png" alt="Alpha X Logo">
                    <h1>Alpha X - Invoice</h1>
                </div>

                <div class="invoice-number">
                    <h2>INVOICE</h2>
                    <p><b>Invoice Number:</b> #{{Invoice.OrderDetails.OrdersID}}</p>
                    <p><b>Date:</b> {{Invoice.OrderDetails.OrderDate}}</p>
                </div>
            </div>
            <div class="invoice-details">
                <div class="customer-details">
                    <h3>Bill To</h3>
                    <p>{{Invoice.CustomerInfo.Name}} {{Invoice.CustomerInfo.Surname}}</p>
                    <p>{{Invoice.CustomerInfo.Email}}</p>
                    <p>{{Invoice.CustomerInfo.PhoneNumber}}</p>
                </div>
                <div class="address-details">
                    <h3>Delivery Address</h3>
                    <p>{{Invoice.AddressInfo.Address}}</p>
                    <p>{{Invoice.AddressInfo.City}}, {{Invoice.AddressInfo.PostalCode}}</p>
                    <p>{{Invoice.AddressInfo.Province}}, {{Invoice.AddressInfo.Country}}</p>
                </div>
            </div>
            <div class="invoice-products">
                <div class="product-heading">
                    <p>Product</p>
                    <p>Colour</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                </div>
                <div class="product-row" v-for="Item in Invoice.OrderItems" :key="Item.ProductID">
                    <p>{{ Item.Brand }} {{ Item.Series }} {{ Item.PhoneModel }} {{ Item.CaseModel }}</p>
                    <p>{{ Item.Colour }}</p>
                    <p>R{{ Item.Price }}</p>
                    <p>{{ Item.Quantity }}</p>
                    <p>R{{Item.Price * Item.Quantity }}</p>
                </div>
            </div>
            <div class="invoice-summary">
                <div class="summary-row">
                    <p>Subtotal:</p>
                    <p>R{{Invoice.OrderDetails.SubTotal }}</p>
                </div>
                <div class="summary-row">
                    <p>Delivery:</p>
                    <p>R{{ Invoice.OrderDetails.Delivery }}</p>
                </div>
                <div class="summary-row">
                    <p>VAT (15%):</p>
                    <p>R{{ Invoice.OrderDetails.VAT }}</p>
                </div>
                <div class="summary-row invoice-total">
                    <p>Total:</p>
                    <p>R{{ Invoice.OrderDetails.TotalAmount}}</p>
                </div>
            </div>
            <div class="invoice-footer">
                <h4>Thank you for shopping with Alpha X.</h4>
                <p>We appreciate your support.</p>
            </div>
        </section>
    </div>
    <section>
        <div class="buttons">
        <RouterLink to="/Shop"><button class="btn">Continue Shopping</button></RouterLink>
        <button class="btn" @click="$print('invoice-container')">Print Invoice</button>
        </div>
    </section>
</template>

<script setup>
import router from '../router/index';
import { onBeforeMount, onMounted, ref } from 'vue';

const Invoice = ref({OrderDetails: {}, CustomerInfo: {}, AddressInfo: {}, OrderItems: [] });

onMounted(() => {
    const storedinvoice = sessionStorage.getItem('Invoice')
    if (!storedinvoice) {
        router.push({ path: '/Shop' });
    } else {
        const getInvoice = sessionStorage.getItem('Invoice');
        Invoice.value = JSON.parse(getInvoice);
    };
});
</script>

<style scoped>
@import '../Assets/Invoice.css';
</style>