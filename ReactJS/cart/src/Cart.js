import React from "react";
import CartItem from "./CartItem";

const Cart = (props) => {

    const { products } = props;
    return (
        <div className="cart">
            {/* this is jsx file so we can use curly brases for JS */}
            {
                products.map((product) => {
                    return <CartItem
                        product={product}
                        key={product.id}
                        onIncreaseQuantity={props.onIncreaseQuantity}
                        onDecreaseQuantity={props.onDecreaseQuantity}
                        onDeleteProduct={props.onDeleteProduct}
                    />
                })
            }
        </div>
    )
}


export default Cart;