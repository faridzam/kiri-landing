import React from 'react';
import {Categories, Products, Carts} from '../components';
import {Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import swal from 'sweetalert';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      products: [],
      choosenCategory: "coffee",
      carts:[],
    };
  }

  componentDidMount(){
    axios
      .get(API_URL + "products/" + this.state.choosenCategory)
      .then((res) => {
        const products = res.data;
        this.setState({products});
      })
      .catch((error) => {
        console.log("error products", error);
      });

      axios
      .get(API_URL + "carts")
      .then((res) => {
        const carts = res.data;
        this.setState({ carts });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }

  componentDidUpdate(prevState) {
    if(this.state.carts !== prevState.carts) {
      axios
      .get(API_URL + "carts")
      .then((res) => {
        const carts = res.data;
        this.setState({ carts });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
    }
  }

  changeCategory = (value) => {
    this.setState({
      choosenCategory : value,
      products: [],
    });

    axios
      .get(API_URL + "products/" + value)
      .then((res) =>{
        const products = res.data;
        this.setState({products});
      })
      .catch((error) => {
        console.log("error menus", error);
      });
  };

  addToCart = (value) => {
    axios
      .get(API_URL + "carts?product_id=" + value.product_id)
      .then((res) => {
        if (res.data.length === 0) {
          const cart = {
            cart_quantity: 1,
            cart_price: value.product_price,
            product: value,
            product_id: value.product_id,
            product_name: value.product_name,
            product_price: value.product_price
          };

          axios
            .post(API_URL + "carts", cart)
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + cart.product_name,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        } else {

          const cart = {
            cart_quantity: res.data[0].cart_quantity + 1,
            cart_price: res.data[0].cart_price + value.product_price,
            product: value,
            product_id: value.product_id,
            product_name: value.product_name,
            product_price: value.product_price
          };

          axios
            .put(API_URL + "carts/" + res.data[0].cart_id, cart)
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + cart.product_name,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  render(){
    const{products, choosenCategory, carts} = this.state;
    return(
      <div className="mt-3">
        <Container fluid>
          <Row>
            <Categories
              changeCategory={this.changeCategory}
              choosenCategory={choosenCategory}
            />
            <Col className="mt-3">
              <h4>
                <strong>Products :</strong>
              </h4>
              <hr />
              <Row className="overflow-auto product">
                {products && products.map((product) => (
                  <Products
                    key={product.product_id}
                    product={product}
                    addToCart={this.addToCart}
                    />
                ))}
              </Row>
            </Col>
            <Carts carts={carts} {...this.props}/>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Home;