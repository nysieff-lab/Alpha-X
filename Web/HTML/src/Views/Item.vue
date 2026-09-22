<template>
    <section>
        <div class="product-container">
            <div class="product-image">
                <img src="../Assets/Images/Carbon_Series_Grid.png" alt="phone case"> <!--TEMPORY IMAGE WHILE STILL IN DEVELOPMENT. Must get from DB-->
            </div>

            <div class="product-details">
                <h2> {{ Item[0]?.Brand }} {{ Item[0]?.Series }} {{ Item[0]?.PhoneModel }} {{ Item[0]?.CaseModel }}</h2>
                <h3> Price: R{{ Item[0]?.Price }}<br/></h3>
                <div> 
                    <label for="colour-select">Choose colour: </label>
                    <select id="colour-select" v-model="SelectedColour" v-on:change="showdescription">
                        <option disabled value="">Select a colour</option>
                        <option v-for="Item in Item" :key="Item.ProductID" :value="Item.ProductID">{{ Item.Colour }}</option>
                    </select><br/>
                </div>
                <div>
                    <button  class="btn" v-on:click="AddtoCart()">Add to Cart</button>
                </div>
                <div class="description">
                        {{ productdescription }}<p>NB. This description is for testing purposes and should be removed. Some products have a tempory description.</p>
                </div>
            </div>
            
        </div> 
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const Item = ref([]);
const CartItem = ref([]);
const SelectedColour = ref('')
const productdescription = ref('')

async function getItem() {
    //Gets from route
    const PhoneModel = route.params.PhoneModel;
    const CaseModel = route.params.CaseModel;
    try {
        const response = await fetch("http://Localhost:3000/api/item",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                PhoneModel: PhoneModel,
                CaseModel: CaseModel
            })
        });
        Item.value = await response.json();
        console.log(Item.value)//Remove

    } catch (error) {
        console.error("could not get Item:", error);
    }
}

function showdescription() {
    const selectedItem = Item.value.find( 
        item => item.ProductID == SelectedColour.value 
    ); 
    if (selectedItem) { 
        productdescription.value = selectedItem.Description; 
    } else { 
        productdescription.value = ''; 
    }
}

async function getCartItem() {
    const ProductID = SelectedColour.value
    console.log(ProductID); //remove  
    try {
        const response = await fetch("http://Localhost:3000/api/cartitem",{
             method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ProductID: ProductID
            })
        });
        CartItem.value = await response.json();
        console.log(CartItem.value) //rewmove
    } catch (error) {
        console.error("Could not acces Cart Item:", error);
    }
}

//needs alot of work
//pulls the item from the data base and then it should push it to the cart in local storage. should push the quantity as one 
function AddtoCart() {
       getCartItem()
}

onMounted(() => {
    getItem();
}); 
</script>

<style scoped>

</style>