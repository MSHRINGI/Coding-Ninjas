import React from "react";
import CartItem from "./CartItem";

class Cart extends React.Component{
    constructor(){
        super();
        this.state = {
            products:[
                {
                    title : "Watch",
                    price : 99,
                    qty : 1,
                    img : '',
                    id: 1
                },
                {
                    title : "Phone",
                    price : 999,
                    qty : 12,
                    img : '',
                    id : 2
                },
                {
                    title : "Laptop",
                    price : 9899,
                    qty : 4,
                    img : '',
                    id : 3
                }
            ]
        }
    }

    handleIncreaseQuantity = (product) => {
        console.log("Increse quantity of this product ", product);
        const { products } = this.state;
        const index = products.indexOf(product);
        products[index].qty += 1;
        this.setState({
            // products: products
            products
        })
    }
    handleDecreaseQuantity = (product) => {
        const { products } = this.state;
        const index = products.indexOf(product);
        if(products[index].qty > 0){
            products[index].qty -= 1;
        }
        this.setState({
            products
        })
    }
    handleDeleteProduct = (id) => {
        const { products } = this.state;
        const items = products.filter((item) => item.id != id);
        this.setState({
            products: items
        })
    }
    render(){
        const {products} = this.state;
        return(
            <div className="cart">
                {/* this is jsx file so we can use curly brases for JS */}
                {
                   products.map((product) => {
                       return <CartItem
                                product = {product}
                                key = {product.id}
                                onIncreaseQuantity = {this.handleIncreaseQuantity}
                                onDecreaseQuantity = {this.handleDecreaseQuantity}
                                onDeleteProduct = {this.handleDeleteProduct}
                            />
                   })
                }
            </div>
        )
    }
}

export default Cart;