<template>
    <section class="top-banner">
        <h1>Admin</h1>
    </section>
    
    <div class="admin-container">
        <div class="side">
        <section class="filters">
            <select id="Brand" v-model="Brand" v-on:change="getAdminProducts"> 
                <option value="">Brand</option>
                <option v-for="Item in Filters.Brand" :key="Item.Brand" :value="Item.Brand">{{ Item.Brand }}</option>
            </select><br/>

            <select id="Series" v-model="Series" v-on:change="getAdminProducts">
                <option value="">Series</option>
                <option v-for="Item in Filters.Series" :key="Item.Series" :value="Item.Series">{{ Item.Series }}</option>
            </select><br/>

            <select id="PhoneModel" v-model="PhoneModel" v-on:change="getAdminProducts"> 
                <option value="">PhoneModel</option>
                <option v-for="Item in Filters.PhoneModel" :key="Item.PhoneModel" :value="Item.PhoneModel">{{ Item.PhoneModel }}</option>
            </select><br/>

            <select id="CaseModel" v-model="CaseModel" v-on:change="getAdminProducts"> 
                <option value="">CaseModel</option>
                <option v-for="Item in Filters.CaseModel" :key="Item.CaseModel" :value="Item.CaseModel">{{ Item.CaseModel }}</option>
            </select><br/>

            <select id="Colour" v-model="Colour" v-on:change="getAdminProducts"> 
                <option value="">Colour</option>
                <option v-for="Item in Filters.Colour" :key="Item.Colour" :value="Item.Colour">{{ Item.Colour }}</option>
            </select><br/>

            <button v-on:click="reset"><i class="material-icons">refresh</i></button>
        </section>
        </div>

        <div class="main">
        <section class="admin-grid" v-if="AdminProducts.length>0">
            <div class="admin-card" v-for="product in AdminProducts" :key="product.ProductID"  >
                <h5>{{ product.Brand}} {{product.Series}} {{product.PhoneModel}} {{product.CaseModel}} {{ product.Colour }}</h5>
                <p>In Stock: {{ product.StockQuantity }}</p>
                <input type="number" v-model.number="product.RestockQuantity" min="1" max="500" placeholder="Quantity">
                <button class="btn" v-on:click="AddStock(product.ProductID, product.RestockQuantity)"><i class="material-icons">add_circle_outline</i></button>
            </div>
        </section>

        <section v-else>
            <h1>No Products Found</h1>
        </section>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import { onMounted, onUnmounted, ref } from 'vue';

const Filters = ref({ Brand: [], Series: [], PhoneModel: [], CaseModel: [], Colour: [] });

const Brand = ref(''); 
const Series = ref(''); 
const PhoneModel = ref(''); 
const CaseModel = ref(''); 
const Colour = ref('');

const AdminProducts = ref([]);

//used AJAX here to fetch Filters with JSON
async function GetFilters() {
    try {
        const response = await fetch("http://Localhost:3000/api/filters",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        Filters.value = await response.json();
    } catch (error) {
        console.error("could not get Filters:", error);
    }
}

//Uses AJAX call to fetch the products for the grid with JSON
async function getAdminProducts() {
    AdminProducts.value = ''
    try {
        const response = await fetch("http://Localhost:3000/api/adminproducts",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Brand: Brand.value,
                Series: Series.value,
                PhoneModel: PhoneModel.value,
                CaseModel: CaseModel.value,
                Colour: Colour.value
            })
        });
        AdminProducts.value = await response.json();
    } catch (error) {
        console.error("Error getting products:", error);
    }
}

async function AddStock(ProductID, RestockQuantity) {
    if (!RestockQuantity || RestockQuantity< 1) {
        window.alert("Please enter a valid quantity");
        return;
    }
    try {
        const response = await fetch("http://Localhost:3000/api/addstock",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ProductID: ProductID,
                RestockQuantity: RestockQuantity
            })
        });
        const data = await response.json();
    } catch (error) {
          console.error("Could not add stock:", error);
    }
    getAdminProducts();
}

function reset() {
    Brand.value = ''; 
    Series.value = ''; 
    PhoneModel.value = ''; 
    CaseModel.value = '';
    Colour.value = ''; 
    getAdminProducts()
}

onMounted(() =>{
    GetFilters();
    getAdminProducts();
})
// Refine Needs Work
/*onUnmounted(()=>{
    window.alert('test')//Remove
    router.removeRoute('/Admin')
});*/

</script>


<style scoped>
    .admin-container {  
        display: flex;
        flex-wrap: nowrap;
        min-height: 50vh;
        flex: 1;
        margin-top: 1em;
    }
    .side {
        flex: 10%;
    }
    .filters{
        padding: 1em;
        margin-top: 1em;
        margin-left: 0.5em;
        border: solid;
        border-color: var(--primary); 
        border-radius: 1em;
        border-width: 0.1em;
        text-align: center;
    }
    .filters select{
        width: 10em;
        padding: 0.1em;
        font-size: medium;
        font-weight: 600;
        border-radius: 0.5em;
        margin-bottom: 0.5em;
    }
    .filters button{
        background: none;
        border: none;
    }
    .filters i {
        color: var(--light);
    }
    .filters i:hover {
        color: var(--secondary);
    }
    .main{
        flex: 90%;
        padding-left: 1em;
    }
    .admin-grid { 
        margin-top: -4em;
    }
    .admin-card {
        margin-bottom: 0.5em;
        border: solid;
        border-color: var(--primary); 
        border-radius: 1em;
        border-width: 0.1em;
        padding: 1em;
        padding-right: 2em;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .admin-card input {
        width: 7em;
        padding: 0.1em;
        font-size: medium;
        font-weight: 600;
        border: 0.1em ;
        border-radius: 0.5em;
        text-align: center;
    }
    
    .admin-card button {
        border: none;
        background: none;
    }

    .admin-card i{
        color: var(--light);
    }

    .admin-card i:hover{
        color: var(--secondary);
    }

</style>