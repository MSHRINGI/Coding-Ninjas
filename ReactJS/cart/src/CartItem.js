import React from "react";

class CartItem extends React.Component {
    constructor(){
        super();
        this.state = {
            title : "Phone",
            price : 999,
            qty : 1,
            img : '',
        }
        this.testing();
    }
    testing(){
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('done');
            }, 5000);
        });

        promise.then(() => {
            // now setState acts like synchronus call
            this.setState({qty: this.state.qty + 10});
            this.setState({qty: this.state.qty + 10});
            this.setState({qty: this.state.qty + 10});

            console.log("Testing state", this.state);
        });
    }
    increaseQuantity = () => {
        // console.log('this.state', this.state);
        // console.log('this', this);

        // method 1
        // this.setState({
        //     qty: this.state.qty + 1
        // });
        // this.setState({
        //     title: "Mobile Phone"
        // });

        // method 2
        this.setState((prevState) => {
            return{
                qty: prevState.qty + 1
            }
        }, () => {
            console.log("State", this.state);
        });
    }
    decreaseQuantity = () =>{
        this.setState((prevState) => {
            if(prevState.qty != 0){
                return{
                    qty: prevState.qty -1
                }
            }
        });
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
                        <img src="https://cdn-icons-png.flaticon.com/512/992/992683.png"
                            alt="decrease"
                            className="action-icons"
                            onClick={this.decreaseQuantity} 
                            />
                        <img src="https://cdn-icons-png.flaticon.com/512/992/992701.png"
                        alt="delete"
                        className="action-icons"
                        />
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