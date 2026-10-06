<template>
    <form action="/action_page.php"> 
    <div class="checkout-container">
        <section class="details">
            <div class="contact">
                <h2>Contact</h2>
                <input type="email" placeholder="Email" v-model="Email" required> 
                <div class="name-row">
                    <input type="text" placeholder="First Name" v-model="FName" required>
                    <input type="text" placeholder="Surname" v-model="Surname" required>
                </div>
                <input type="tel" placeholder="012 456 6789" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" v-model="PhoneNumber" required>
            </div>
            <div class="delivery">
                <h2>Delivery</h2>
                <input type="text" placeholder="Country" v-model="Country" required> 
                <input type="text" placeholder="Address" v-model="Address" required> 
                <div class="country-row">
                    <input type="text" id="City" placeholder="City" v-model="City" required>
                    <select id="Province" name="Province" v-model="Province" required>
                        <option disabled value="">Province</option> 
                        <option value="Eastern Cape">Eastern Cape</option>
                        <option value="Free State">Free State</option>
                        <option value="Gauteng">Gauteng</option>
                        <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                        <option value="Limpopo">Limpopo</option>
                        <option value="Mpumalanga">Mpumalanga</option>
                        <option value="Northern Cape">Northern Cape</option>
                        <option value="North West">North West</option>
                        <option value="Western Cape">Western Cape</option>
                    </select>
                    <input type="text" id="Postalcode" placeholder="Postal Code" v-model="PostalCode" required>
                </div>
                <p>Please Note: Delivery is only available within South Africa.</p>
            </div>
        </section>

        <section class="order">
            <div class="products-list">
                <div class="products-card" v-for="CartItem in Cart" :key="CartItem.ProductID">
                    <h4 class="quantity">{{ CartItem.Quantity }}</h4>
                    <h5>{{CartItem.Brand}} {{CartItem.Series}} {{CartItem.PhoneModel}} {{CartItem.CaseModel}} {{ CartItem.Colour }}</h5>
                    <h5>Total: R{{ CalculateTotal(CartItem) }}</h5> <!--Calculated on Front end For simplicity. Might Change!!!-->
                </div>
            </div>
            <div class="summarry">
                <h4>SubTotal: R{{ SummaryData.SubTotal }}</h4> 
                <p>Number of items: {{ CartQuantity }}</p><br>
                <p>Shipping: R{{ SummaryData.Delivery }}</p> 
                <p>VAT: R{{ SummaryData.VAT }}</p><br> 
                <hr>
                <h3>Total: R{{ SummaryData.Total }}</h3> 
                <i>Total Price includes VAT</i>
            </div>
            <button class="btn" v-on:click="test()">Place Order</button>
        </section>
    </div>
    </form>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { CalculateTotal, CartQuantity } from '@/Functions/Cart';
import { loadCart } from '@/Functions/Cart';
import router from '../router/index';

//Tidy up
const Email = ref('');
const FName = ref('');
const Surname = ref('');
const PhoneNumber = ref('');
const Country = ref('');
const Address = ref('');
const City = ref('');
const Province = ref('');
const PostalCode = ref('');

const Cart = ref(
    JSON.parse(localStorage.getItem('Cart')) || []
);
const SummaryData = ref({});

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

//temporary Remove/ modify ect
function test() {
    console.log(Email.value+" "+FName.value+" "+Surname.value+" "+PhoneNumber.value); 
}

// Load Checkout when page opens
onMounted(() => {
    if (CartQuantity.value>0) {
        loadCart();
        GetSummaryData();
    } else {
        router.push({ path: '/Shop' })
    }
    
});
</script>

<style scoped>

</style>