import React from "react";

class CartItem extends React.Component {
    constructor(){
        super();
        this.state = {
            title : "Phone",
            price : 999,
            qty : 1,
            img : ''
        }
    }
    increaseQuantity = () => {
        console.log('this.state', this.state);
        console.log('this', this);
    }
    render(){
        const { title, price, qty} = this.state;
        return (
            <div className="cart-item">
                <div className="left-block">
                    <img style={styles.image} />
                </div>
                <div className="right-block">
                    <div style={{fontSize : 25}}>{title}</div>
                    <div style={{color : '#777'}}>Rs {price}</div>
                    <div style={{color : '#777'}}>Qty : {qty} </div>
                    <div className="cart-item-actions">
                        {/* { Buttons } */}
                        <img src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
                            alt="increase"
                            className="action-icons"
                            onClick={this.increaseQuantity}
                        />
                        <img src="https://cdn-icons-png.flaticon.com/512/992/992683.png" alt="decrease" className="action-icons"/>
                        <img src="https://cdn-icons-png.flaticon.com/512/992/992701.png" alt="delete" className="action-icons"/>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    image : {
        height : 110,
        width : 110,
        borderRadious : 4,
        background : '#ccc'
    }
}

export default CartItem;