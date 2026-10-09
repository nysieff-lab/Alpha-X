<template>
    <div v-if="CartQuantity>0" class="cart-container">
        <section class="cart-items">
            <div class="cart-header">
                <h3>Product</h3>
                <h3>Price</h3>
                <h3>Quantity</h3>
                <h3>Total</h3>
            </div>
            
            <div class="cart-card" v-for="CartItem in Cart" :key="CartItem.ProductID"> 
                <img v-if="CartItem.Image" :src="CartItem.Image" >
                <img v-else src="../Assets/Images/No Image Available.png" :alt="CartItem.CaseModel">
                <h5>{{CartItem.Brand}} {{ CartItem.Series }} {{ CartItem.PhoneModel }} {{ CartItem.CaseModel }} {{ CartItem.Colour }}</h5> 
                <h5>Price: R{{ CartItem.Price }}</h5> 
                <div>
                    <button v-on:click="DecreaseQuantity(CartItem.ProductID)"><i class="material-icons">remove</i></button>
                    <span>{{CartItem.Quantity}}</span>
                    <button v-on:click="IncreaseQuantity(CartItem.ProductID)"><i class="material-icons">add</i></button>
                </div>
                <h5>Total: R{{ CalculateTotal(CartItem) }}</h5>
                <button v-on:click="RemoveItem(CartItem.ProductID)"><i class="material-icons">delete</i></button>
            </div>
        </section>

        <section class="cart-summary">
            <div class="summary">
                <h3>Cart Summary</h3><br/><hr/><br/>
                <p>Items in cart: {{ CartQuantity }}</p><br/> 
                <p>SubTotal: R{{ SummaryData.SubTotal }}</p>
                <p>Delivery: R{{SummaryData.Delivery}}</p><br/>
                <hr/><br/>
                <p class="total">Total: R{{ SummaryData.Total }}</p>
            </div>
            <RouterLink to="/Checkout"><button class="btn">Check Out</button></RouterLink>
        </section>
    </div>

    <div v-else class="cart-container">
        <section></section> <!--REMOVE-->
        <section>
            <h1>Shopping Cart</h1>
            <p>Your Cart is Currently empty.</p>
            <RouterLink to="/Shop"><button class="btn">Continue Shopping</button></RouterLink>
        </section>
    </div>
</template>

<script setup>
import { CalculateTotal, CartQuantity } from '@/Functions/Cart';
import  {ref} from 'vue';
import {onMounted} from 'vue';
import { UpdateCart } from '@/Functions/Cart';
import { loadCart } from '@/Functions/Cart';
import { useToast } from "vue-toastification";

const toast = useToast();

const Cart = ref(
    JSON.parse(localStorage.getItem('Cart')) || []
);
const SummaryData = ref({});

function DecreaseQuantity(ProductID){
    const CartItem = Cart.value.find(CartItem => CartItem.ProductID === ProductID);
    if (!CartItem) {
        return;
    }
    if (CartItem.Quantity > 1) {
        CartItem.Quantity--;
        localStorage.setItem('Cart', JSON.stringify(Cart.value));
    }
    UpdateCart();
    GetSummaryData();
};

function IncreaseQuantity(ProductID) {
    const CartItem = Cart.value.find(CartItem => CartItem.ProductID === ProductID);
     if (!CartItem) {
        return;
    }
    if (CartItem.Quantity<CartItem.StockQuantity) {
        CartItem.Quantity++;
        localStorage.setItem('Cart', JSON.stringify(Cart.value));
    } else {
        window.alert("Max Stock Reached. There are only "+CartItem.StockQuantity+" Available");
    }
    UpdateCart();
    GetSummaryData();
};

//Removves an item from cart
function RemoveItem(ProductID) {
    Cart.value = Cart.value.filter(CartItem => CartItem.ProductID !== ProductID);
    localStorage.setItem('Cart', JSON.stringify(Cart.value));
    toast.success("Removed Item from Cart")
    UpdateCart();
    GetSummaryData();
};

//uses AJAX call to fetch data with JSON
async function GetSummaryData() {
     try {
        const response = await fetch("http://localhost:3000/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(Cart.value)
        });
        SummaryData.value = await response.json();
     } catch (error) {
        console.error("Error getting Data:", error);
     }
}

// Load cart when page opens
onMounted(() => {
    loadCart();
    GetSummaryData();
});
</script>


<style scoped>

</style>