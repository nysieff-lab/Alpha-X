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
            
            <div class="cart-card"> 
                <img src="../Assets/Images/Carbon_Series_Grid.png"> <!--FOr design purposes-->
                <h5>Samsung galaxy S25+ Classic {{ "Red" }}</h5> <!--ADD VARIABLE-->
                <h5>Price: {{ "R0.00" }}</h5> <!--ADD VARIABLE-->
                <div>
                    <button><i class="material-icons">remove</i></button>
                    <span>{{ 0 }}</span><!--ADD VARIABLE-->
                    <button><i class="material-icons">add</i></button>
                </div>
                <h5>Total: {{ "R0.00" }}</h5>
                <button><i class="material-icons">delete</i></button>
            </div>
        </section>

        <section class="cart-summary">
            <div class="summary">
                <h3>Cart Summary</h3><br/><hr/><br/>
                <p>Items in cart: {{ 0 }}</p><br/> <!--ADD VARIABLE-->
                <p>SubTotal: {{ "R0.00" }}</p><!--ADD VARIABLE-->
                <p>Delivery: R150.00</p><br/>
                <hr/><br/>
                <p class="total">Total: {{ "R0.00" }}</p><!--ADD VARIABLE-->
            </div>
            <button class="btn">Check Out</button>
        </section>
    </div>
</template>

<script setup>

</script>


<style scoped>

</style>