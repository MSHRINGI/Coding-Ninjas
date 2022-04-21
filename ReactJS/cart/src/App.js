// import './App.css';
// import CartItem from "./CartItem";
import Cart from "./Cart";
import Navbar from "./Navbar";
import React from "react";
import firebase from "firebase";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    }
  }

  componentDidMount(){
    firebase
      .firestore()
      .collection('products')
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        });
        this.setState({
          products: products,
          loading : false
        });
      });
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
    if (products[index].qty > 0) {
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
  getCartCount = () => {
    let count = 0;
    const {products} = this.state;
    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }
  getCartTotal = () =>{
    let total = 0;
    const {products} = this.state;
    products.map((product) => {
      total = total + product.qty * product.price;
    })
    return total;
  }

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()}/>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        { loading && <h1> Products Loading...</h1>}
        <div>
          <span>Total : {this.getCartTotal()} </span>
        </div>
      </div>
    );
  }
}

export default App;
