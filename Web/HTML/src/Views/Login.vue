<template>
    <section>
        <div class="login-container">
            <img src="../Assets/Images/Logo V3.png" alt="Logo" class="login-logo">
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
import { onBeforeMount, ref } from "vue";
import router from '../router/index'
import { useToast } from "vue-toastification";
import API from "@/Services/API";

const toast = useToast();

const UserName = ref('');
const Password = ref('');

//Uses AJAX call to fetch the Logins with JSON
async function Login() {
    if (!UserName.value || !Password.value ) {
        toast.error("Please enter Username and Password");
        return
    }
    const response = await API.post("/api/login",  //API.post is the same as fetch when using Axios
        {
            UserName: UserName.value,
            Password: Password.value
        });
const loginData = await response.data;

    if (loginData.success) {
        sessionStorage.setItem("LoggedIn", "true");
        toast.success(loginData.message); 
        router.push({ path: '/Admin' })
    } else {
        console.log(loginData.message);
        toast.error(loginData.message);
    }
}

onBeforeMount(()=>{
    const LoggedIn = sessionStorage.getItem("LoggedIn");
    if (LoggedIn) {
        router.push({ path: '/Admin' })
    }
});
</script>


<style scoped>
@import '../Assets/Login.css';
</style>