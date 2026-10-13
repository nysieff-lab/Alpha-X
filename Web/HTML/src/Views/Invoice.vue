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
import router from '@/router';
import { onBeforeMount, ref } from 'vue';

const Invoice = ref({Items: []});

onBeforeMount(() => {
    if (!sessionStorage.getItem('Invoice')) {
        router.push('/Shop')
    } else {
        const getInvoice = sessionStorage.getItem('Invoice');
        Invoice.value = JSON.parse(getInvoice);
    }
});
</script>

<style scoped>
    .invoice-container {
        width: 90%;
        max-width: 65em;
        margin: 3em auto;
        padding: 1.5em;
        box-sizing: border-box;
        background: var(--light);
        color: var(--dark);
        border:solid;
        border-color: var(--dark);
        border-width: 0.1em;
        border-radius: 1em;
        font-family: Arial, sans-serif;
    }
    .invoice-header {
        margin-top: -3em;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1em;
        padding-bottom: 1em;
        margin-bottom: 2em;
        border-bottom: solid;
        border-bottom-width: 0.2em;
        border-bottom-color: var(--primary) ;
    }
    .invoice-logo {
        display: flex;
        align-items: center;
        gap: 1em;
    }
    .invoice-logo img {
        width: 5em;
        height: 5em;
        object-fit: contain;
    }
    .invoice-logo h1 {
        font-size: 24px;
        margin: 0;
    }
    .invoice-number {
        text-align: right;
    }
    .invoice-number h2 {
        color: var(--primary);
        margin-top: 0;
    }
    .invoice-details {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1em;
        margin-bottom: 2em;
    }
    .invoice-details h3 {
        color: var(--primary);
        margin-bottom: 0.5em;
    }
    .invoice-details p {
        margin: 0.4em 0;
    }
    .invoice-products {
        width: 100%;
        margin-bottom: 3em;
    }
    .product-heading, .product-row {
        display: grid;
        grid-template-columns: 3fr 1fr 1fr 0.5fr 1fr;
        gap: 1em;
        align-items: center;
        padding: 1em;
        box-sizing: border-box;
    }
    .product-heading {
        background: var(--dark);
        color: var(--light);
        font-weight: bold;
        border-radius: 0.4em;
    }
    .product-row {
        border-bottom:solid;
        border-bottom-width: 0.1em;
        border-bottom-color: var(--dark);
        overflow-wrap: anywhere;
    }
    .product-heading p:last-child, .product-row p:last-child {
        text-align: right;
    }
    .invoice-summary {
        width: 100%;
        max-width: 20em;
        margin-left: auto;
    }
    .summary-row {
        display: flex;
        justify-content: space-between;
        gap: 2em;
        padding: 0.5em 0em;
    }
    .invoice-total {
        border-top: solid;
        border-top-width: 0.1em;
        border-top-color: var(--primary) ;
        margin-top: 0.5em;
        padding-top: 0.5em;
        font-size: 20px;
        font-weight: bold;
        color: var(--primary);
    }
    .invoice-footer {
        text-align: center;
        margin-top: 3em;
        padding-top: 2em;
        border-top: solid;
        border-top-width: 0.1em;
        border-top-color: var(--dark) ;
    }
    .invoice-footer h3 {
        margin-bottom: 2em;
    }
    .buttons {
        display: flex;
        gap: 2em;
    }

    @media print {
        .invoice-container {
            visibility: visible;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .invoice-container {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            max-width: none;
            margin: 0;
            padding: 0;
            border: none;
        }

        @page {
            margin: 2mm;
        }
    }
</style>