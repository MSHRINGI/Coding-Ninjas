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
    this.db = firebase.firestore();
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
    // console.log("Increse quantity of this product ", product);
    const { products } = this.state;
    const index = products.indexOf(product);
    // products[index].qty += 1;
    // this.setState({
    //   // products: products
    //   products
    // })
    const docRef = this.db.collection('products').doc(products[index].id);
    docRef
      .update({
        qty: product.qty + 1
      })
      .then(() => {
        console.log("Updated Successfully");
      }).catch((err) => {
        console.log("Error : ", err);
      })
  }
  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].qty > 0) {
      // products[index].qty -= 1;
      const docRef = this.db.collection("products").doc(product.id);
      docRef
        .update({
          qty : product.qty - 1
        })
        .then(() => {
          console.log("Qty decreased successfully");
        })
        .catch((err) => {
          console.log("Error in decreasing : ", err);
        })
    }
    // this.setState({
    //   products
    // })
  }
  handleDeleteProduct = (id) => {
    // const { products } = this.state;
    // const items = products.filter((item) => item.id != id);
    // this.setState({
    //   products: items
    // })
    const docRef = this.db.collection("products").doc(id);
    docRef
      .delete()
      .then(() => {
        console.log("Deleted successfully");
      })
      .catch((err) => {
        console.log("Error in deleting : ", err);
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

  addProduct = () => {
    this.db
      .collection("products")
      .add({
        img: "",
        title: "Washing Machine",
        price: 7999,
        qty: 1
      })
      .then((docRef) => {
        console.log('Product has been created ', docRef);
      })
      .catch((error) => {
        console.log("Error", error);
      })
  }

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()}/>
        <button onClick={this.addProduct}>Add a product</button>
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
