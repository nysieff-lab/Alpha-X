<template>
    <header>
        <nav class="navbar">
            <RouterLink to="/" class="logo">
                <img src="../Assets/Images/Logo V3.png" alt="AX Logo"><!--Fix Photo-->
            </RouterLink>
            <ul class="nav-links">
                <li><RouterLink to="/">Home</RouterLink></li>
                <li><RouterLink to="/Shop">Shop</RouterLink></li>
                <li><RouterLink to="/About">About</RouterLink></li>
            </ul>
            
            <div class="icons">        
                <a href="#"><i class="material-icons">search</i></a>  
                <div class="cart-container">
                    <a href="#"><i class="material-icons">shopping_cart</i></a>
                        <!--number of items in cart here-->
                    <span class="cart-quantity">{{ 0 }}</span>
                </div>
                <a href="#"><i class="material-icons">account_circle</i></a>
            </div>
        </nav>
    </header>
</template>