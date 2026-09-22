<template>
    <section>
        <div class="login-container">
            <img src="../Pictures/Logo V3.png" alt="Logo" class="login-logo">
            <h3>UserName</h3>   
            <input type="text" v-model="UserName" class="login-boxes">
           
            <h3>Password</h3>
            <input type="password" v-model="Password" class="login-boxes">
            
            <div>
                <button class="btn" v-on:click="Login">Login</button> 
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
import router from '../router/index'
import Admin from "./Admin.vue";

const UserName = ref('');
const Password = ref('');

async function Login() {
    const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            UserName: UserName.value,
            Password: Password.value
        })
    });
const loginData = await response.json();

    if (loginData.success) {
        router.addRoute({ path: '/Admin', name:'Admin', component: Admin })
        window.alert(loginData.message)
        router.push({ path: '/Admin' })
    } else {
        console.log(loginData.message); // change to error message on webpage
        window.alert(loginData.message)
    }
}
</script>


<style scoped>

</style>