import { ref } from 'vue';
import { computed } from "vue";

//Loads the Cart
const Cart = ref(
    JSON.parse(localStorage.getItem('Cart')) || []
);

// Quantity of items in cart
export const CartQuantity = computed(() => {
    return Cart.value.reduce((Total, CartItem) => Total + CartItem.Quantity, 0);
});


export function UpdateCart() {
    Cart.value = JSON.parse(localStorage.getItem('Cart')) || [];
}

//Gets the item from DB for Cart
async function getCartItem(ProductID) {
    //const ProductID = SelectedColour.value
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
       const CartItem = await response.json();
        return CartItem
    } catch (error) {
        console.error("Could not acces Cart Item:", error);
    }
}

//Adds an item to the Cart
export async function AddtoCart(ProductID) {
    const CartItemResponse = await getCartItem(ProductID);
    if (!CartItemResponse) {
        return;
    }
    const CartItem = Array.isArray(CartItemResponse)
        ? CartItemResponse[0]
        : CartItemResponse;

    let Cart = JSON.parse(localStorage.getItem("Cart")) || [];

    const ExistingItem = Cart.find(
        Item => String(Item.ProductID) === String(CartItem.ProductID)
    );
    
    if (ExistingItem) {
        if (ExistingItem.Quantity >= CartItem.StockQuantity) {
            window.alert("Max Stock Reached. There are only "+CartItem.StockQuantity+" Available");
            return;
        }
        ExistingItem.Quantity++;
    } else {
        Cart.push({
        ...CartItem, 
        Quantity: 1
        });
    }
    
    localStorage.setItem("Cart", JSON.stringify(Cart));
    console.log("Cart:", Cart);//remove
    UpdateCart();
}
