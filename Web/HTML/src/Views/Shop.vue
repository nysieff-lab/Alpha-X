<template>
    <section class="top-banner">
        <h1>Shop</h1>
    </section>

    <div class="shop-container">
       <div class="side">
        <section class="search">
            <input type="search">
            <i class="material-icons">search</i><!--Needs to be programmed-->
        </section>
        <section class="filters">
            <H3>Filters</H3>
            <div class="filterboxs">
                <select id="Brand" v-model="Brand" v-on:change="getProducts">
                    <option value="">All Brands</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                </select><br/>
                <select id="CaseModel" v-model="CaseModel" v-on:change="getProducts">
                    <option value="">All Series</option>
                    <option value="Classic">Classic</option> 
                    <option value="Citizen">Citizen</option> 
                    <option value="Carbon">Carbon</option>
                </select><br/>
                <Button v-on:click="reset"><i class="material-icons">refresh</i></Button>
            </div> 
        </section>
        </div>

        <div class="main">
        <section>
            <div class="product-grid-shop">
                <div class="product-card-shop" v-for="product in Products" :key="product.PhoneID"  >
                    <RouterLink :to="`/item/${product.Brand}/${product.Series}/${product.PhoneModel}/${product.CaseModel}/${product.PhoneID}/${product.ProductID}`">
                    <div class="product-image"> 
                        <img :src="product.Image" alt="Tactical Carbon Case"> 
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

const Brand = ref('');
const CaseModel = ref('');
const Products = ref([]);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getProducts() {
    Products.value = ''
   await sleep(100);
    try {
        const response = await fetch("http://Localhost:3000/api/products",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Brand: Brand.value,
                CaseModel: CaseModel.value
            })
        });
        Products.value = await response.json();
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
    getProducts();
}); 
</script>

<style scoped>
    
</style>