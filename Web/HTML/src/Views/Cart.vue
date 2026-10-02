<template>
    <div class="cart-container">
        <section class="cart-items">
            <div class="cart-header">
                <h3>Product</h3>
                <h3>Price</h3>
                <h3>Quantity</h3>
                <h3>Total</h3>
            </div>
            <!--Must use a loop to load cart on condition theres items in the cart else an error message is displayed-->
            
            <div class="cart-card" v-for="CartItem in Cart" :key="CartItem.ProductID"> 
                <img src="../Assets/Images/Carbon_Series_Grid.png"> <!--FOr design purposes-->
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
                <p>SubTotal: R{{ CartTotal.SubTotal }}</p>
                <p>Delivery: R{{CartTotal.Delivery}}</p><br/>
                <hr/><br/>
                <p class="total">Total: R{{ CartTotal.Total }}</p>
            </div>
            <button class="btn">Check Out</button>
        </section>
    </div>
</template>

<script setup>
import { CartQuantity } from '@/Functions/Cart';
import  {computed, ref} from 'vue';
import {onMounted} from 'vue';
import { UpdateCart } from '@/Functions/Cart';

const Cart = ref(
    JSON.parse(localStorage.getItem('Cart')) || []
);

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
};

//Removves an item from cart
function RemoveItem(ProductID) {
    Cart.value = Cart.value.filter(CartItem => CartItem.ProductID !== ProductID);
    localStorage.setItem('Cart', JSON.stringify(Cart.value));
    UpdateCart();
};

//calculates the cost of each item
function CalculateTotal(CartItem){
    const TotalItemCost = CartItem.Price * CartItem.Quantity
    return TotalItemCost
}

//calculates total cosdt for cart cart summary
//Actual prices for invoice will be calculated on the backend
const CartTotal = computed(() => {
    const Delivery = 150;
    let SubTotal = 0;
    for (let Index = 0; Index < Cart.value.length; Index++) {
        SubTotal = SubTotal + Cart.value[Index].Price * Cart.value[Index].Quantity;
    }
    const Total = SubTotal + Delivery
    return {SubTotal,Delivery,Total};
})

// Load cart from localStorage
function loadCart() {
    Cart.value = JSON.parse(localStorage.getItem("Cart")) || [];
}


// Load cart when page opens
onMounted(() => {
    loadCart();
});
</script>


<style scoped>

</style>