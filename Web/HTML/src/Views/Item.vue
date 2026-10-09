<template>
    <section>
        <div class="product-container">
            <div class="product-image">
                    <img v-if="Item[0]?.Image" :src="Item[0]?.Image" >
                    <img v-else src="../Assets/Images/No Image Available.png" :alt="Item[0]?.PhoneModel"> 
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
                    <button  class="btn" v-on:click="AddtoCart(SelectedColour)">Add to Cart</button>
                </div>
                <div class="description">
                        {{ productdescription }}
                </div>
            </div>
            
        </div> 
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AddtoCart } from '@/Functions/Cart';

const route = useRoute();
const Item = ref([]);
const SelectedColour = ref('')
const productdescription = ref('')

//used AJAX here to fetch item with JSON
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

onMounted(() => {
    getItem();
}); 
</script>

<style scoped>

</style>