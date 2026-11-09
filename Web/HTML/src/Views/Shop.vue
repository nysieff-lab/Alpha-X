<template>
    <section class="top-banner">
        <h1>Shop</h1>
    </section>

    <div class="shop-container">
       <div class="side">
        <section class="filters">
            <h3>Filters</h3>
            <div class="filterboxs">
                <select id="Brand" v-model="Brand" v-on:change="getProducts">
                    <option value="">All Brands</option>
                    <option v-for="Item in Filters.Brand" :key="Item.Brand" :value="Item.Brand">{{ Item.Brand }}</option>
                </select><br/>
                <select id="CaseModel" v-model="CaseModel" v-on:change="getProducts">
                    <option value="">All Series</option>
                    <option v-for="Item in Filters.CaseModel" :key="Item.CaseModel" :value="Item.CaseModel">{{ Item.CaseModel }}</option>
                </select><br/>
                <button v-on:click="reset"><i class="material-icons">refresh</i></button>
            </div> 
        </section>
        </div>

        <div class="main">
        <section>
            <div class="product-grid-shop">
                <div class="product-card-shop" v-for="product in Products" :key="product.PhoneID"  >
                    <RouterLink :to="`/item/${product.Brand}/${product.Series}/${product.PhoneModel}/${product.CaseModel}/${product.PhoneID}/${product.ProductID}`">
                    <div class="product-image"> 
                            <img v-if="product.Image" :src="product.Image" >
                            <img v-else src="../Assets/Images/No Image Available.png" :alt="product.PhoneModel"> 
                        <div class="product-info"> 
                            <h3>{{ product.Brand}} {{product.Series}} {{product.PhoneModel}} {{product.CaseModel}}</h3>
                            <p>R{{ product.Price }}</p> 
                        </div> 
                    </div> 
                    </RouterLink>
                </div>
            </div>
        </section>
        </div>

    </div>
</template>
<script setup>

import { ref } from 'vue';
import { onMounted } from 'vue';
import API from "../Services/API";

const Brand = ref('');
const CaseModel = ref('');
const Products = ref([]);
const Filters = ref({ Brand: [], CaseModel: []});
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//used AJAX here to fetch Filters with JSON
async function GetFilters() {
    try {
        const response = await API.post("/api/filters");
        
        Filters.value = response.data;
    } catch (error) {
        console.error("could not get Filters:", error);
    }
}


//Uses AJAX call to fetch the products for the grid with JSON
//Demonstrated with the sleep function
async function getProducts() {
    Products.value = ''
   await sleep(100);
    try {
        const response = await API.post("/api/products", //API.post is the same as fetch when using Axios
            {
                Brand: Brand.value,
                CaseModel: CaseModel.value
            }
        );
        Products.value = await response.data;
    } catch (error) {
        console.error("Error getting products:", error);
    }
}

function reset() {
    Brand.value = ''; 
    CaseModel.value = '';
    getProducts();
}

onMounted(() => {
    GetFilters();
    getProducts();
}); 
</script>

<style scoped>
    @import '../Assets/Shop.css';
</style>